## 使用说明

KISSY url 模块用来对 url 作解析，提供一个包装后的 `url` 对象便于开发者对其操作。

功能上相当于 Node.js 的核心模块 url，只是在 API 的细节上有所不同。

## 基本使用示例

```javascript
var url = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';
var urlDataObj = Url.parse(url);

/**
 * {
 *    hash: '#hash',
 *    host: 'host.com:8080',
 *    hostname: 'host.com',
 *    href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
 *    path: '/p/a/t/h?query=string',
 *    pathname: '/p/a/t/h',
 *    port: '8080',
 *    protocol: 'http:',
 *    query: 'query=string',
 *    search: '?query=string',
 *    slashes: true
 * }
 */
console.log(urlDataObj);

urlDataObj.search = undefined;
urlDataObj.query = {
  user: 'kissy'
};
var newUrl = Url.format(urlDataObj);

/**
 * 'http://user:pass@host.com:8080/p/a/t/h?user=kissy#hash'
 */
console.log(newUrl);

```
