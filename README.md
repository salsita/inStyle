# chilli-seed

`chilli-seed` is a CSS skeleton framework for application interfaces that promotes high usability abstractions, simple to follow componentization logic and favors concise methodologies.

## Installation

`npm install`  
`gulp`

## Features

### Components
`chilli-seed` assumes universal component roles independent of element defaults, the following is therefore equal.

```
<button>Submit</button>
<a role='button' href='/someurl'>Submit</a>
```

### ngAnimate-like


### IconFont

`chilli-seed` will automatically build all `.svg` images in the `src/components/icons` directory into all possible webfont versions and copy the resulting font files into `build/assets/font`.

### Responsive

Stylus leverages media queries beautifully as element variations and pixel-based shortcuts for the most common device types are available.

```
header
  height 40px
  @media $mobile
    position fixed
    height 20px
  @media $widescreen
    float left
    width 200px
    height 100%
```

### Effects

Mature `animate.css` support and Robert Penner's `easing.styl` functions.

### Distribute

Aligning children inside parent elements is easy.
Mixins available for both `inline-block` and `flexbox` child distribution methods on x/y axis.

```css
header
  distribute(left, center)

footer
  distribute-flex(center, bottom)
```

### Retina

The `background-retina` mixin switches `background-image` sources based on `device-pixel-ratio` media queries. In the following case, `image@2x.png` or `image@3x.png` would be used on supporting devices.

```css
background-retina('path/to/image.png', 100px, auto)
```

### Forms

Basic form concepts, including icon usage and checkbox/radio switchers, are available.

### Popover / Tooltip

Simple popovers and JavaScript-less tooltips conjured out of pseudoelements, yea.

### Debug

A visual debug mode is available when the `$debug` variable is set to `true` in `config.styl`. Idea repackaged from [inuitcss](https://github.com/inuitcss).
