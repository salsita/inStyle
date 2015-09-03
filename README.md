# chilli-seed

A minimal Stylus-based responsive CSS seed skeleton that promotes high usability abstractions in favor of bootstrapism and complex architecture.

## Installation

`npm install`  
`gulp`

## Features

### Componens
`chilli-seed` boldly assumes universal HTML components as base elements in the following format.

```
+component(widget)
  widget
  .widget
  [class^=widget-]
  [class*= widget-]
  [role=widget]
```

### Normalize / Reset

`chilli-seed` currently uses [normalize.css](http://necolas.github.io/normalize.css/) to achieve vendor consistency, to be replaced with a more lightweight solution. Various other reset types (based on nib) available as a mixins.

```
.element
  reset()
```

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
