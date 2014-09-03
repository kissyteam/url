/**
 * url spec for kissy
 * @author yiminghe@gmail.com
 */

var url = require('url');

/*jshint quotmark:false*/
describe("url", function () {
    it("create works", function () {
        var base = url.parse("http://my:sd@a/b/c/d;p?q#w");
        expect(base.protocol).to.equal("http:");
        expect(base.host).to.equal("a");
        expect(base.auth).to.equal("my:sd");
        expect(base.pathname).to.equal("/b/c/d;p");
        expect(base.query).to.equal("q");
        expect(base.hash).to.equal("#w");
    });

    it("invalid http:g", function () {
        var base = url.parse("http:g");
        expect(base.protocol).to.equal("http:");
        expect(!base.host).to.equal(true);
        expect(!base.auth).to.equal(true);
        expect(base.pathname).to.equal("g");
        expect(!base.query).to.equal(true);
        expect(!base.hash).to.equal(true);
    });

    it("will lowercase ", function () {
        var base = url.parse("HTTP://MY:SD@A/B/C");
        expect(base.protocol).to.equal("http:");
        expect(base.host).to.equal("a");
        expect(base.pathname).to.equal("/B/C");
        expect(!base.query).to.equal(true);
        expect(!base.hash).to.equal(true);
    });

    it("create and parse query works", function () {
        var base = url.parse("http://my:sd@a/b/c/d;p?q=1#w", true);
        expect(base.protocol).to.equal("http:");
        expect(base.host).to.equal("a");
        expect(base.auth).to.equal("my:sd");
        expect(base.pathname).to.equal("/b/c/d;p");
        expect(base.query).to.deep.equal({q: '1'});
        expect(base.hash).to.equal("#w");
    });

    if (navigator.userAgent.indexOf('Trident') === -1) {
        // ie regexp bug
        it('works for file:', function () {
            var base = url.parse("file:d:/x.png", true);
            expect(base.protocol).to.equal("file:");
            expect(!base.host).to.equal(true);
            expect(base.pathname).to.equal("d:/x.png");
            expect(base.href).to.equal('file:d:/x.png');
            expect(url.format(base)).to.equal("file:d:/x.png");
        });
    }

    it('works for file://', function () {
        var base = url.parse("file:///d:/x.png", true);
        expect(base.protocol).to.equal("file:");
        expect(!base.host).to.equal(true);
        expect(base.pathname).to.equal("/d:/x.png");
        expect(base.href).to.equal('file:///d:/x.png');
        expect(url.format(base)).to.equal("file:///d:/x.png");
    });

    it('set hash works', function () {
        var u = url.parse('http://www.g.cn#heihei');
        expect(u.hash).to.equal('#heihei');
        u.hash = 'haha';
        expect(url.format(u)).to.equal('http://www.g.cn/#haha');
    });

    it('set hash works -2', function () {
        var u = url.parse('http://www.g.cn/#heihei');
        expect(u.hash).to.equal('#heihei');
        u.hash = ('haha');
        expect(url.format(u)).to.equal('http://www.g.cn/#haha');
    });

    describe('query', function () {
        it('allow special attribute name', function () {
            var u = url.parse('http://www.g.cn/?q=1', true);
            u.query.nodeType = 1;
            u.search = undefined;
            expect(url.format(u)).to.equal('http://www.g.cn/?q=1&nodeType=1');
        });
    });

    it("resolve works", function () {
        var base = ("http://a/b/c/d;p?q");

        // Normal Examples
        expect(url.resolve(base, "g:h")).to.equal("g:h");

        expect(url.resolve(base, ("g"))).to.equal("http://a/b/c/g");
        expect(url.resolve(base, ("./g"))).to.equal("http://a/b/c/g");
        expect(url.resolve(base, ("g/"))).to.equal("http://a/b/c/g/");
        expect(url.resolve(base, ("/g"))).to.equal("http://a/g");

        expect(url.resolve(base, ("//g"))).to.equal("http://g/");
        expect(url.resolve(base, ("?y"))).to.equal("http://a/b/c/d;p?y");
        expect(url.resolve(base, ("g?y"))).to.equal("http://a/b/c/g?y");

        expect(url.resolve(base, ("#s"))).to.equal("http://a/b/c/d;p?q#s");
        expect(url.resolve(base, ("g#s"))).to.equal("http://a/b/c/g#s");
        expect(url.resolve(base, ("g?y#s"))).to.equal("http://a/b/c/g?y#s");
        expect(url.resolve(base, (";x"))).to.equal("http://a/b/c/;x");
        expect(url.resolve(base, ("g;x"))).to.equal("http://a/b/c/g;x");
        expect(url.resolve(base, (""))).to.equal("http://a/b/c/d;p?q");

        expect(url.resolve(base, ("."))).to.equal("http://a/b/c/");
        expect(url.resolve(base, ("x/."))).to.equal("http://a/b/c/x/");
        expect(url.resolve(base, ("x/y/.."))).to.equal("http://a/b/c/x/");

        expect(url.resolve(base, ("./"))).to.equal("http://a/b/c/");
        expect(url.resolve(base, (".."))).to.equal("http://a/b/");

        expect(url.resolve(base, ("../"))).to.equal("http://a/b/");
        expect(url.resolve(base, ("../g"))).to.equal("http://a/b/g");
        expect(url.resolve(base, ("../.."))).to.equal("http://a/");
        expect(url.resolve(base, ("../../"))).to.equal("http://a/");
        expect(url.resolve(base, ("../../g"))).to.equal("http://a/g");

        // Abnormal Examples
        expect(url.resolve(base, ("../../../g"))).to.equal("http://a/g");
        expect(url.resolve(base, ("../../../../g"))).to.equal("http://a/g");

        //others
        expect(url.resolve(base, ("/./g"))).to.equal("http://a/g");
        expect(url.resolve(base, ("/../g"))).to.equal("http://a/g");
        expect(url.resolve(base, ("g."))).to.equal("http://a/b/c/g.");
        expect(url.resolve(base, (".g"))).to.equal("http://a/b/c/.g");
        expect(url.resolve(base, ("g.."))).to.equal("http://a/b/c/g..");
        expect(url.resolve(base, ("..g"))).to.equal("http://a/b/c/..g");

        expect(url.resolve(base, ("./../g"))).to.equal("http://a/b/g");
        expect(url.resolve(base, ("./g/."))).to.equal("http://a/b/c/g/");
        expect(url.resolve(base, ("g/./h"))).to.equal("http://a/b/c/g/h");
        expect(url.resolve(base, ("g/../h"))).to.equal("http://a/b/c/h");

        expect(url.resolve(base, ("g;x=1/./y"))).to.equal("http://a/b/c/g;x=1/y");
        expect(url.resolve(base, ("g;x=1/../y"))).to.equal("http://a/b/c/y");

        expect(url.resolve(base, ("g?y"))).to.equal("http://a/b/c/g?y");

        expect(url.resolve(base, ("g#s/./x"))).to.equal("http://a/b/c/g#s/./x");
        expect(url.resolve(base, ("g#s/../x"))).to.equal("http://a/b/c/g#s/../x");

        // loophole
        // path=="g" or hostname=="g" ??
        expect(url.resolve(base, ("http:g"))).to.equal("http://a/b/c/g");

        expect(url.resolve('http://g.cn?t', ("http://g.cn#t"))).to.equal("http://g.cn/#t");

        expect(url.resolve('http://x:n@g.cn/x?t', ("http://g.cn"))).to.equal("http://x:n@g.cn/");
    });
});
/**
 * Refer
 *  - http://www.ietf.org/rfc/rfc3986.txt 5.4
 */
