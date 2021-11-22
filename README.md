# [URL Shortener Microservice](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice) :symbols:

This project is part of the FreeCodeCamp's Back End Development and APIs Certification.

Packages used:

- [Express](https://expressjs.com/)
- [body-parser](https://github.com/expressjs/body-parser#readme)
- [MongoDB](https://mongoosejs.com/)


## Functionality :heavy_check_mark:

- You can POST a URL to `/api/shorturl` and get a JSON response with original_url and short_url properties. Here's an example: `{ original_url : 'https://freeCodeCamp.org', short_url : 1}`;

- When you visit `/api/shorturl/<short_url>`, you will be redirected to the original URL;

- If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain `{ error: 'invalid url' }`.


## How To Run FCC Tests locally

- Has [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) (and optionally [Yarn](https://yarnpkg.com/)) installed and updated on your machine;

- Clone (`$ git clone git@github.com:filipy94/url-shortener-microservice.git`) or donwload this repository;

- Navigate to project root;

- Install the dependencies with `$ npm install` or `$ yarn install`;

- Execute the project with `$ npm start` or `$ yarn start`;

- Manually open the browser and go to `http://localhost:PORT`.