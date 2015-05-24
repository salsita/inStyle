# gonzo-seed

No default skin. No useless grids. Very few opinions.  
  
A Stylus-based responsive CSS seed for UI developers that promotes high usability abstractions in favor of bootstrapism and hacking on overweight frameworks.  
  
## Installation

`npm install`  
`gulp`  
  
## Features

### Normalize

`gonzo-seed` currently uses [normalize.css](http://necolas.github.io/normalize.css/) to achieve vendor consistency.

### IconFont

`gonzo-seed` will automatically build all `.svg` images in the `src/components/icons` directory into all possible webfont versions and copy the resulting font files into `build/assets/font`.

### Responsive

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

`animate.css` and Robert Penner's `easing.styl` functions.

### Distribute

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

### Debug

A visual debug mode is available when the `$debug` variable is set to `true` in `main.styl`.