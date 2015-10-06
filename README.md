# chili

`chili` is a UI skeleton framework-wannabe that embraces natural HTML5 concepts and the wonderful syntax sugar of SASS/Stylus(back soon!&trade;) to simplify and beautify the way you write and think about CSS.

## Why use it?

Write nested states for all things, making your source cleaner and better structured.

```
+component('form')
  border: 1px solid black

  +component('input')
    font-family: inherit

    +state(':invalid') // state of input
      border-color: red

    +state('.disabled, [aria-disabled]', form) // states of form influencing input
      opacity: .5
      pointer-events: none

    +media(tablet) // media query for input in form
      width: 90%
```

Define abstract components with your preferred class-butchering methodology and reference them anywhere.

```
+component('h1, h2, h3, .--hdngBG', headings)
  font-size: 9001rem

main
  article
    +component(headings)
      font-weight: bold
```

Use included functions to craft fundamental CSS relations quickly, keep the source footprint minimal and well readable and add visual effects EZ (support for AngularJS and React).
```
+component(header)
  size(block, 100%, 200px)
  position(fixed, top 0, left 0)

  .logo
  	hide-text()
    background-retina(logo.png, 200px)

  nav
    distribute-children(left 10px, center, row)
    indent-children(right 10px, bottom 10px)

    +state('.nav-hidden', root)
      ng-animate(leave, fadeOutLeft)
```

## Installation

`npm install`  
`gulp`

`chili.sass` should be your central point for importing all components.  
Build paths can be changed in `gulpfile.js`.  
Currently only available in SASS, until [this](https://github.com/stylus/stylus/issues/1703) is fixed.

## Components

Readme in progress.

### Base

### Iconfont

### Media presets

### Animation

## Functions / Mixins

Readme in progress.
