# Lodashify

A simple Javascript [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) that lets you use [lodash](https://www.npmjs.com/package/lodash) on any object with chaining!

... like, all jQuery kinda style.


```js
const $ = require('lodashify');
var users = [
  { id: 899444, login: 'addaleax', active: true },
  { id: 110455, login: 'bengl', active: true },
  { id: 498775, login: 'MylesBorins', active: false },
  { id: 439929, login: 'jasnell', active: true },
]

var $results = $(users)                   // LODASHIFY!
  .$filter(['active', false])           // filter to only Myles
  .$set('0.cool', 100)                  // add a `cool` property to Myles
  .$set('2.oh.the.places.we\'ll', 'go') // and some other random object

console.log($results)
// [ { id: 498775, login: 'MylesBorins', active: false, cool: 100 },
//     ,
//     { oh: { the: { places: { 'we\'ll': 'go' } } } } ]
```


You need a version of [lodash](https://www.npmjs.com/package/lodash) installed in your project. 

```bash
$ npm install lodash, lodashify
```

# License
MIT
