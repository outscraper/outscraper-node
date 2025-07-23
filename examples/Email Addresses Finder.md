# Email Addresses Finder With Server-side JavaScript

Allows to validate email addresses. Checks if emails are deliverable. [Outscraper API](https://app.outscraper.cloud/api-docs#tag/Email-Related/paths/~1email-validator/get).

## Installation

Install the package with:
```bash
npm install outscraper --save
# Or
yarn add outscraper
```

[Link to the NPM package page](https://www.npmjs.com/package/outscraper)

## Initialization
```js
const Outscraper = require('outscraper');
// Or using ES modules:
import Outscraper from 'outscraper';

let client = new Outscraper('SECRET_API_KEY');

```
[Link to the profile page to create the API key](https://app.outscraper.com/profile)

## Usage

```js
// Validate email addresses:
client.validateEmails(['support@outscraper.com']).then(response => {
   console.log(response);
});;
```
