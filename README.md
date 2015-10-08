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
+component('form')
  border: 1px solid black

  +component('input')
    font-family: inherit

    +state(':invalid') // state of input
      border-color: red

    +state('.disabled, [aria-disabled]', form) // states of form influencing input
      opacity: .5
      pointer-events: none

    +media('<tablet') // media query for input in form
      width: 90%
```

Use included functions to craft fundamental CSS relations quickly, keep the source footprint minimal and well readable and add visual effects easily.
```Sass
+component(header)
  +size(block, 100%, 200px)
  +position(fixed, top: 0, left: 0)

  .logo
  	+hide-text()
    +background-retina(logo.png, 200px)

  +component(nav)
    +distribute-children(left: 10px, center, row)
    +indent-children(right: 10px, bottom: 10px)

    +state('.nav-hidden', header)
      +ng-animate(leave: fadeOutLeft)
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


### Stylus

Currently only available in SASS. [1703](https://github.com/stylus/stylus/issues/1703)

## Components

`chili` comes with a few helpful components to get you started on a project.

### Base

Base uses [normalize.css](https://github.com/necolas/normalize.css/) as default and defines 2 top level components - `root` (html) and `body`. This is useful for referencing top level attributes coming from libraries like Modernizr or states that change the whole page scaffold.

```Sass
.button-submit
  +state('.no-js', root)
    display: none

.wrapper
  +state('.dialog-visible', body)
    overflow hidden
```

### Iconfont

The `gulp` build process automagically converts all your `.svg` icon sources into webfonts and renders the `icons` component. That allows you to easily use icons on pseudoelements and tweak their colors based on your design unlike your average closet .png.

### Media

In SASS, media query logic is provided by [include-media](https://github.com/eduardoboucas/include-media). Allows very flexible and expressive media conditioning - refer to its [documentation](http://include-media.com/#features) for details.

```Sass
article
  max-width 960px

  +media('>phone', '<desktop')
    max-width 480px
```

### Animation

Modern CSS transitions and animations are subject to a refined technical lifetime with JavaScript switching `display` values and/or adding classes at the right moment. Modern UI frameworks like Angular or React know this and provide features to make this lifetime manageable. `chili` currently supports `ngAnimate` and `CSSTransitionGroup` wrappers, while the effect bank is provided by [animate.css](https://github.com/daneden/animate.css/).

```Sass
.ng-doodle
  +ng-animate(enter: $bounceInLeft, leave: $bounceInRight)

.react-doodle
  +react-animate(enter: $doubleUp)
```

## Functions / Mixins

`chili` is equipped with many helper functions to simplify your writing style.
Give in, you might like it!

Readme in progress.
