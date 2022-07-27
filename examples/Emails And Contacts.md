# Emails And Contacts Scraper With Server-side JavaScript

Allows finding email addresses, social links, and phones from domains via [Outscraper API](https://app.outscraper.com/api-docs#tag/Emails-and-Contacts).

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
# Search contacts from website:
client.emailsAndContacts(['outscraper.com']).then(response => {
    console.log(response);
});
```
