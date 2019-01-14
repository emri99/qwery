## Qwery
Qwery is a modern selector engine built on top of `querySelectorAll` giving you practical utility.

### Browser Support

  - IE10+
  - Chrome 1+
  - Safari 3+
  - Firefox 4+

### Usage

* Syntax:

```
qwery(selector, context)
```

* Parameters

|Argument|Type|Default|Description|
---|---|:---:|:--|
`selector` | `string | Element | Element[]` | - | a css selector, an element, or an array of elements|
`context` | `string | Element | Element[]` | `document` | a css selector, an element, or an array of elements (only first item will be used as context)

When using a `context`, elements will be search inside this context.

* Examples:

``` js
const links = qwery('a');
// always return an array, even when targetting one id
const myItem = qwery('#myItem')[0];

// Each query can optionally pass in a context
const divsInNode = qwery('div', node);   // div inside node element
const divsInFoo = qwery('div', '#foo'); // using css selector as context
```


### Dev Env & Testing

``` sh
npm install
make test
```

### About this fork

Fork created to:
* fix detected issue [106](https://github.com/ded/qwery/issues/106)
* remove ender support
* remove IE6-8 specific code
* update dev dependencies

