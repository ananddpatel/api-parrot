# Parrot - API Mocking middleware for Express js

## Use case

One of the biggest hurdles in testing how an API responds to your requests is the need to create a mock response. This is a lengthy and cumbersome process which involves creating a copy of the API in a separate environment and then feeding it relevant fake data to respond to your API call. Multiple teams have to be engaged to complete the task of testing an API, this process obviously adds too much of an overhead to a rather simple/routine QA task.

Parrot has been developed to specifically address this issue, it can be used alongside your existing API service without any changes. Parrot simplifies the entire process and accomplishes the end goal with just **2** lines of code and absolutely **zero** changes to any other part of your API/service.

It is a highly simplified and efficient solution to a problem that has been bothering QA and Developers alike.

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

Go to `http://localhost:3000/parrot`

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
