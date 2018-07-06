# api-parrot

Api Mocking middleware for Expressjs


Mocking APIs is time consuming, repeating lines of code that do the same thing to pass responses. Deploying mock environments every time a change needs to be made on a moments notice takes time and disrupts the development workflow.

Parrot can be used alongside your API service or creating a seperate service solely for mocking. Parrot simplifies the entire mocking process this with just **TWO** lines of code and absolutely **ZERO** lines of code changes to the rest of your service.

```js
var Parrot = require('api-parrot').Parrot(app)
app.use(Parrot)
```

Parrot provides a simple UI that accepts a URL, the JSON response, and a HTTP status code to mock. Mocked URLs and responses are kept inside the "Parrot Cage" that can be added, removed, or edited easily without any technical know how or re-deployments.

