# Parrot - API Mocking middleware for Express js

## Use case

Mocking APIs is time consuming, repeating lines of code that do the same thing to pass responses. Deploying mock environments every time a change needs to be made on a moments notice takes time and disrupts the development workflow.

Parrot can be used alongside your API service or creating a seperate service solely for mocking. Parrot simplifies the entire mocking process this with just **TWO** lines of code and absolutely **ZERO** lines of code changes to the rest of your service.

## Getting started

```bash
$ npm install --save api-parrot
```

```js
1| var app = require('express')();
2| var Parrot = require('api-parrot').Parrot(app);
3| app.use(Parrot);
4| app.listen(3000);
```

## Features

- Parrot provides a simple and intuitive web UI that can be accessed through `https://example.com/parrot`
- Parrot accepts a URL, the JSON response, and a HTTP status code to mock.
- The "Parrot Cage" holds the mocked responses. Caged responses can be added, removed, or edited easily with minor know how of JSON responses.
- Optionally match start of URL only
  - Many URLs can have dynamic query parameters that can't realistically be mocked e.g. current date & time
- Disable responses if not needed
- Group caged responses under a common alias
- Release/Disable caged responses after a certain time.

## What Parrot does better

- Web interface
- Zero code changes
- Developer independent changes
- Single deployment
- Dynamic URL matching
- Simulate any HTTP status code
- Browser independent
