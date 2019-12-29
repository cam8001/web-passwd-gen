# web-passwd-gen

A standalone webpage for generating secure passwords.

The plan is to publish this to https://passwordgen.camerontod.com/, and allow anyone else to publish it anywhere they like too.

# Usage

- Run build.sh to generate a series of randomised English dictionary words. They'll be saved in a `words` directory at the root of the repo.
- Publish index.html and the `words/` directory somewhere where they can be accessed in a browser.
- Generate strong passwords.

# @TODO
  * @todo move Javascript into its own file.
  * @todo Implement gulp to: lint code, check JSDoc compliance, replace tokens automatically (ga id, number of words files), and collate Javascript into index.html for deployment.
  * @todo Add GDocs tag.
  8 @todo Styling and UX
