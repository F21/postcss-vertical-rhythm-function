# PostCSS Vertical Rhythm Function [![wercker status](https://app.wercker.com/status/66d770775f3a50d05c3ff906946a5659/s "wercker status")](https://app.wercker.com/project/bykey/66d770775f3a50d05c3ff906946a5659)

[PostCSS] plugin to use vertical rhythm by providing a unit-agnostic vr() function.

How is this different from [postcss-vertical-rhythm]?
 - This plugin allows you to use your own units (px, rem, em, etc). `vr()` is unitless.
 - You can use `line-height` or `font` to define your line-height.
 - This plugin works well in cases where the `font-size` is unknown and cannot be used to compute an exact vertical rhythm during build time.
   An example is the [postcss-responsive-type] plugin which generates rules to resize your type using the browser's width.

[PostCSS]: https://github.com/postcss/postcss
[postcss-vertical-rhythm]: https://github.com/markgoodyear/postcss-vertical-rhythm
[postcss-responsive-type]: https://github.com/seaneking/postcss-responsive-type

```css
body {
  font-size: 100%;
  line-height: 2;
}

.test {
  padding: vr(1)rem;
}
```

```css
body {
  font-size: 100%;
  line-height: 2;
}

.test {
  padding: 2rem;
}
```

## Usage

```js
postcss([ require('postcss-vertical-rhythm-function') ])
```

See [PostCSS] docs for examples for your environment.
