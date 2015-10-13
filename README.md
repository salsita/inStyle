# chili

`chili` is a UI skeleton that embraces natural HTML5 concepts and the wonderful syntax sugar of SASS/Stylus(back soon!&trade;) to simplify and beautify the way you think about CSS.

## Why use it?

*Components* and *States*, wooooo!

Define abstract components with your preferred class-butchering methodology and reference them anywhere.

```Sass
+component('h1, h2, h3, .--hdngBG', headings)
  font-weight: bold

article
  +component(headings)
    font-size: 9001rem
```

Write nested states for components, making your source cleaner and better structured.

```Sass
+component('form#contact-us', myForm)
  border: 1px solid black

  +component('input')
    font-family: inherit

    +state(':invalid') // state of input
      border-color: red

    +state('.disabled, [aria-disabled]', myForm) // states of form influencing input
      opacity: .5
      pointer-events: none

    +media('<tablet') // media query for input in form
      width: 90%
```

Use included functions to craft fundamental CSS relations quickly, keep the source footprint minimal and well readable and add visual effects easily.
```Sass
+component(header)
  +size(flex, auto 200px)
  +position(fixed, top 20px left)

  .logo
  	+hide-text
    +background-retina(logo.png, 200px)

  +component(nav)
    +distribute-children(left center, column)
    +indent-children(right 10px bottom 10px, last-child)

    +state('.nav-hidden', header)
      +ng-animate(leave, fadeOutLeft)
```

## Installation

### SASS

`chili` currently requires Ruby SASS due to 3.4 features.

- Install Ruby - [Win](http://rubyinstaller.org/), [Linux](https://www.ruby-lang.org/en/documentation/installation/#package-management-systems)

- `gem install sass`

- `npm install`

- `gulp sass`

`main.sass` should be your central point for importing individual components.
Build paths can be changed in `gulpfile.js`.
The build process also autoprefixes properties and optimizes/minifies your selectors.

If you want to import components individually in your project, you have to fill in the `components.scss` map and use it with every import, so components can be cross-referenced without compiling the whole stack.

### Stylus

Currently only available in SASS. [1703](https://github.com/stylus/stylus/issues/1703)

## Components

`chili` comes with a few helpful components to get you started on a project.

### Base

Base uses [normalize.css](https://github.com/necolas/normalize.css/) or [Meyer reset](http://meyerweb.com/eric/tools/css/reset/) as default and defines 2 top level components - `root` (html) and `body`. This is useful for referencing top level attributes coming from libraries like Modernizr, states that change the whole page scaffold or any other exception necessary to propagate from a parent node.

```Sass
.button-submit
  +state('.no-js', root)
    display: none

.wrapper
  +state('.dialog-visible', body)
    overflow hidden
```

### Iconfont

The `gulp` build process automagically converts all your `.svg` icon sources into webfonts and renders the `icons` component. That allows you to easily use custom icons on pseudoelements - variable names are created for each icon based on filename.

```Sass
// hamburglar.svg

button:before
  +icon($icon-hamburglar)
```

### Media

In SASS, media query logic is provided by [include-media](https://github.com/eduardoboucas/include-media), which allows very flexible and expressive media conditioning - refer to its [documentation](http://include-media.com/#features) for details.

```Sass
article
  max-width: 960px

  +media('>phone', '<desktop')
    max-width: 480px
```

### Animation

Modern CSS transitions and animations are subject to a refined technical lifetime with JavaScript switching `display` values and/or adding classes at the right moment. Modern UI frameworks like Angular or React know this and provide features to make this lifetime manageable. `chili` currently supports `ngAnimate` and `CSSTransitionGroup` wrappers for keyframe animations and transitions, effect bank provided by [animate.css](https://github.com/daneden/animate.css/).

Keyframe animation definitions are only rendered in the resulting CSS when used.

```Sass
.ng-doodle
  +ng-animate(enter, bounceInLeft)
  +ng-animate(leave, bounceOutRight)

.react-doodle
  +react-animate(fade, enter)
    opacity: 1
```

## Functions / Mixins

#### `component('selector', [reference])`

`chili` promotes the pattern of always nesting attributes relevant to your current selector, even if they are modified by a parent. This allows you to maintain a clear writing style, keeping all element variants in their place. 

```Sass
+component('aside.user-info', card)

  .avatar // everything possibly related to .avatar in card can be here
    color: blue
    +state('.--back-visible', card) // aside.user-info.--back-visible .avatar
      transform: rotateX(180deg)
    +state(header) // header aside.user-info .avatar, assumes a header defined
      float: right
    +media('<tablet') // @media (max-device-width: 767px) ...
      width: 20%

  .name
    font-weight: bold
```

If you enjoy flexibility, you might find components helpful for keeping collections identified by multiple properties. Mind that all the nested variations will be output in the compiled CSS, which can grow fast for ex: multiple states on multiple components.

```Sass
+component('button, .button, [role=button]', btn)

form
  +component(btn)
    background-color: blue
    +state('.disabled, [disabled], [aria-disabled]') // taking it too far, Jim
      opacity: .5
      pointer-events: none
```

#### `state('selector', [target])`

When you define a component reference, it's saved for later reuse.

```Sass
+component('html', root)
```

Because there is no real DOM present, components operate under simple rules - if a component state is called and the target selector is found in the current nest, it's modified by the state. If it's not present, it's expected to be a level above.

```Sass
+component('#nav-main', nav)
  
  ul
    +unstyled-list

    .item
      display: block

      +state('.open', nav) // selector is #nav-main.open ul .item nav
        transform: translateX(-100%)

      +state('.wide', root) // selector is body.wide #nav-main ul .item nav
        display: inline-block
        float: left
```

### Proportional

`chili` is equipped with many helper functions to simplify your writing style and scaffold your layout in a more expressive way.  
Give in, you might like it!

#### `size([display], width height)`

```Sass
nav
  +size(flex, auto 80px)

.icon:before
  +size(16px 16px) // knows to add content: '', defaults unset display to block
```

#### `position(type, coords)`

```Sass
nav
  +position(fixed, left top)

div
  +position(absolute, stretch) // keyword for top 0 right 0 etc.

span
  +position(relative, right 20px top 20px)
```

#### `offset([x, y])`

Offset from current top left border position.

```Sass
.dialog
  +position(absolute, left 50% top 50%)
  +offset() // recenter
```

#### `distribute(x y, [direction])`

Distributes direct children inside current element, translating into flexbox values.

```Sass
ul
  +distribute(left center) // default row

+component(itemWrap)
  +distribute(right top, column)
```

#### `indent(x y, [exclude])`

Indents each direct child's margin with optional exclusion.

```Sass
.gallery
  +indent(right 10px bottom 10px)

.vertical-list
  +indent(bottom 5em, last-child)  // excludes last-child
```

#### `grid()`

### Animation

#### `ng-animate(state, [animation, duration])`

`chili` extends selector with the `.ng-{state}` classes for keyframe animations.

```Sass
.item
  +ng-animate(enter, zoomIn)
  +ng-animate(leave, zoomOut)
```

Transitions are used as nodes instead by omitting the optional properties.

```Sass
.item
  transition: opacity .2s ease-in
  +ng-animate(enter)
    opacity: 1
  +ng-animate(leave)
    opacity : 0

```

#### `react-animate(class, direction)`

`chili` for React supports block mixins as nodes to add the necessary React classes.

```Sass
.item
  +react-animate(fade, enter)
    opacity: 1
  +react-animate(fade, leave)
    opacity: 0
```

### Media

#### `media('rule', ['rules'])`

[Documentation](http://include-media.com/#features)

#### `background-retina(path/file.png, width height)`

Adds high resolution `background-image` sources for high DPI screens based on pattern `file.png > file@2x.png, file@3x.png`.

### Typography

If the default base component is used, font scaling is set to 62.5% and `16px = rem(16)`. All values resulting from em/rem can be further processed.

#### `em(px)`

#### `rem(px)`

#### `hide-text()`

#### `truncate-text([width])`

### Shapes

#### `circle(radius)`

#### `triangle(orientation, bgcolor, size)`

```Sass
+component(dialog)
  :before
    +triangle(up)
    +position(absolute, left 50% top)
```

#### `chevron(position, background, size)`

Draws a chevron from current element inside relative parent, recognizes a pseudoelement.

### HTML

#### `unstyled-list()`

#### `unstyled-button()`

#### `reset()`
