postcss-extract-animations [![NPM Version](https://img.shields.io/npm/v/postcss-extract-animations.svg)](https://www.npmjs.com/package/postcss-extract-animations) [![NPM License](https://img.shields.io/npm/l/postcss-extract-animations.svg)](https://www.npmjs.com/package/postcss-extract-animations)
=======
[![NPM Downloads](https://img.shields.io/npm/dm/postcss-extract-animations.svg)](https://www.npmjs.com/package/postcss-extract-animations)
[![Build Status](https://img.shields.io/travis/tivac/postcss-extract-animations.svg)](https://travis-ci.org/tivac/postcss-extract-animations)
[![Dependency Status](https://img.shields.io/david/tivac/postcss-extract-animations.svg)](https://david-dm.org/tivac/postcss-extract-animations)
[![devDependency Status](https://img.shields.io/david/dev/tivac/postcss-extract-animations.svg)](https://david-dm.org/tivac/postcss-extract-animations#info=devDependencies) [![Greenkeeper badge](https://badges.greenkeeper.io/tivac/postcss-extract-animations.svg)](https://greenkeeper.io/)

Extract inline `@keyframes` from your CSS rules so you can look at everything in one place.

## Example

```css
.a {
    animation: 1s @keyframes {
        to {
            opacity: 1;
        }
    }
}
```

becomes

```css
@keyframes anim-c4fe818f {
    to {
        opacity: 1
    }
}
.a {
    animation: 1s anim-c4fe818f
}
```

Reducing the risk of drift since everything is contained within a single selector!

## Usage

```js
postcss([ require('postcss-extract-animations') ])
```

See [PostCSS](https://github.com/postcss/postcss) docs for examples for your environment.
