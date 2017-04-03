const lodash = require('lodash')
const customInpsect = require('util').inspect.custom
const value = Symbol('wrapped value')

const maybeWrap = (target) => {
  if (/object|function/.test(typeof target)) {
    return target
  }
  return {
    // value: target,
    [value]: target,
    [Symbol.toPrimitive]: () => target,
    [customInpsect]: () => target
  }
}

const handlers = {
  get: (target, key) => {
    // don't mess with symbols
    if (typeof key === 'symbol' && target[key]) {
      return target[key]
    }
    // unwrap if it was wrapped
    if (target[value]) {
      target = target[value]
    }
    const lodashFn = key[0] === '$' && lodash[key.substr(1)]

    if (lodashFn) {
      return (...args) => lodashifier(lodashFn(target, ...args))
    }
    // a couple of things get mad if you try to use them. So exclude them...
    return typeof key === 'symbol' || /prototype|valueOf/.test(key)
      ? target[key]
      : lodashifier(target[key])
  }
}

const lodashifier = (target) => new Proxy(maybeWrap(target), handlers)

module.exports = new Proxy(lodashifier, {
  get: (target, key) => lodash[key]
})
