koa-jsonfile
=============

read/write JSON files for koa.

<!-- [![build status](https://secure.travis-ci.org/Hanggi/koa-jsonfile.svg)](http://travis-ci.org/Hanggi/koa-jsonfile) -->


Installation
------------

    npm install koa-jsonfile --save



Example
------------

```js
var koa = require('koa');
var jsonfile = require('koa-jsonfile');
var app = koa();

var jf = jsonfile({
    root: 'json_data',
});

app.use(function *(next) {
    var write = yield jf.write('data.json', {foo: 123, bar: 'abc'});

    var read = yield jf.read('data.json');

    yield next;
});
