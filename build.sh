#!/bin/bash
function to_json() {
  awk ' BEGIN { ORS = ""; print "["; } { print "\/\@"$0"\/\@"; } END { print "]"; }' | sed "s^\"^\\\\\"^g;s^\/\@\/\@^\", \"^g;s^\/\@^\"^g"
}

function file_to_json() {
  FILENAME=$1;
  NEWFILENAME="$FILENAME.json";
  FILE_PREFIX="const word_list = ";
  FILE_SUFFIX=";";
  cat $FILENAME | to_json > $NEWFILENAME;
  echo $FILE_PREFIX | cat - $NEWFILENAME > temp && mv temp $NEWFILENAME
  echo $FILE_SUFFIX >> $NEWFILENAME;
}

shuf() { ruby -e 'Signal.trap("SIGPIPE", "SYSTEM_DEFAULT");
                     puts ARGF.readlines.shuffle' "$@"; }

rm -rf words*
mkdir words
# Download a public words list
echo -e "Downloading words file."
wget https://raw.githubusercontent.com/dwyl/english-words/master/words.txt -O words.tmp
# Shuffle the file into a random order
echo -e "Shuffling words file."
shuf words.tmp > words.shuffled
echo -e "Take the first 100,000 lines."
# Take the first 100,000 lines.
head -n100000 words.shuffled > words.txt
echo -e "Split it into 20 files of 5000 words (lines) each."
# Split it into multiple files of 5000 words (lines) each.
split -l 5000 words.txt words/words-
echo -e "Convert each file in words/ to JSON."
# Convert each file in words/ to JSON.
cd words
for words_file in $(find . -type f)
do
  file_to_json $words_file
done;

# Cleanup
find . -not -name  "*json" -exec rm {} \;
cd ..
rm words.shuffled words.tmp words.txt
