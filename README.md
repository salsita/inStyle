# inStyle

Nest everything relevant to your elements.. under your elements!
The ultimate ableism for code structure.

## Methodology

Components as native or custom elements.

```Html
<date>
  <day>1</day>
  <month>August</month>
  <year>2009</year>
</date>
```

Classes for component variants and abstracted designs.

```Html
<button class='save glossy'>Save</button>
```

Reach parents and their states from anywhere in the current cascade.
Meet the `in()` function:

```Sass
links
  display: block

  item
    display: block

    +in('header')
      display: inline-block // header links item

    a
      line-height: 1.5

      +in('item:hover')
        color: blue  // links item:hover a (parent found in cascade)

      +in('footer:hover, header')
        color: red // footer:hover links item a, header links item a 
```

```Sass
button
  appearance: none

  &.save
    background-color: blue

    +in('content, dialog')
      margin: 0 .5rem // content button.save, dialog button.save

    +in('header:hover')
      transform: scale(1.1) // header:hover button

    +media('<tablet')
      font-size: 4vw
```

## Installation

`inStyle` currently requires Ruby SASS due to 3.4 features. Conversion to `libsass` will be immediate once 3.4 is stable.

- Install Ruby - [Win](http://rubyinstaller.org/), [Linux](https://www.ruby-lang.org/en/documentation/installation/#package-management-systems)

- `gem install sass`

- `npm install`

- `gulp`

`main.sass` should be your central point for importing individual components.
Build paths can be changed in `gulpfile.js`.
The build process also autoprefixes properties and optimizes/minifies your selectors and media queries. **Note:** The build process is only necessary for the iconfont component, you can freely import the SASS stack standalone or use the core SASS `instyle` package alone.

## Components

`inStyle` comes with a few handy components to get you started on a project.

### Base

Base uses [normalize.css](https://github.com/necolas/normalize.css/) or [Meyer reset](http://meyerweb.com/eric/tools/css/reset/) and can serve as a scaffold for your app/page.

### Iconfont

The `gulp` build process automagically converts all your `.svg` icon sources in `components/icons` into a webfont and renders the `icons.sass` component. That allows you to easily use custom icons on pseudoelements without tainting HTML - variable names are created for each icon based on filename.

```Sass
// hamburglar.svg

button:before
  +icon($icon-hamburglar)
```

### Media

Nestable media query logic is provided by [include-media](https://github.com/eduardoboucas/include-media), which allows very flexible and expressive conditioning - refer to its [documentation](http://include-media.com/#features) for details.

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

## How it works

`inStyle` promotes the pattern of always nesting attributes relevant to your current selector, even if they are modified by a parent (which can be a piece in the current cascade). This allows you to maintain a clear writing style, keeping all properties of an individual element in one place. 

```Sass
user-info-card
  position: absolute

  avatar // everything related to avatar in user-info-card can be here
    color: blue
    +in('user-info-card.flipped') // user-info-card.flipped avatar
      transform: rotateX(180deg)
    +in('header') // header user-info-card avatar
      float: right
    +media('<tablet') // @media (max-device-width: 767px) ...
      width: 20%

  name
    font-weight: bold
```

Because there is no real DOM present, the `in()` mixin operates under simple rules - if a base element (eg. `header` in `header.main:hover`) is found in the current cascade, it's appended with the state. If it's not present, it's expected to be a parent of the cascade and is prepended in full instead. Combinations and multiple properties are taken care of intuitively.

```Sass
ul,
ol
  list-style: none

    li
      display: block

      a
        line-height: 1.5

        +in('ol:hover')
          color: red  // ol:hover li a (removes irrelevant ul)

        +in('li:hover')
          color: blue  // ul li:hover a, ol li:hover a

        +in('footer')
          font-size: 1.4rem  // footer ul li a, footer ol li a
          color: white
```

Happy coding!
