## Methods

### format( url [, serializeArray] )

将 url 对象转为 url 字符串。

#### Parameters:

* url {Url} - 从 `Url.parse` 得到的 url 对象。

* serializeArray {Boolean} - 如果 `url.search === undefined` 且 `url.query` 中包含数组，
  则转化成的 url 字符串是否需要在数组 key 后加上 [] 标识。默认值：true.

#### Returns:

* url {String} - 格式化后的 url 串。

#### Example:

```javascript
var websiteUrl = 'http://docs.kissyui.com/5.0/api/classes/Path.html?test=iamtestcontent&date=2014.09.10#method_resolve';
var urlDataObj = Url.parse(websiteUrl);
urlDataObj.search = undefined;
urlDataObj.query = {
    name: 'weekeight',
    love: 'kissy',
    arr: [1,2,3]
};

var newUrl = Url.format(urlDataObj);
```

### parse ( url [, parseQueryString] )

解析 url 字符串为 url 对象。
url 对象包含的键值有：auth, hash, host, hostname, href, path, pathname, port, protocol, query, search, slashes.

#### Parameters:

* url {String} - url 字符串。

* parseQueryString {Boolean} - 是否将 querystring 转化为对象形式。默认值：false.

#### Returns:

* urlDataObj {Url} - Url 对象。

### resolve ( from, to )

得到绝对地址的 url：类似于在浏览器中点击一个不完整的 url，跳转到的绝对地址 url.

#### Parameters:

* from {String} - 基准 url.

* to {String} - 跳转 url.

#### Returns:

* resolvedUrl {String} - 处理后的 url 串。

#### Example:

```javascript
// 得到 'docs.kissyui.com/guides/overlay/index.html'
Url.resolve('docs.kissyui.com/guides/','overlay/index.html');
```