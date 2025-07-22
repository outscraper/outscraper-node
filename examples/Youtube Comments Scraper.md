# Youtube Comments Scraper With Server-side JavaScript

Returns comments from YouTube videos.[Outscraper API](https://app.outscraper.cloud/api-docs#tag/Reviews-and-Comments/paths/~1youtube-comments/get).

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
// Get information about the comments from YouTube videos:
client.youtubeComments(['https://www.youtube.com/watch?v=ph5pHgklaZ0']).then(response => {
   console.log(response);
});;
```
