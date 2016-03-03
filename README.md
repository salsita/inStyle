# inStyle

`inStyle` is a CSS authoring tool to modify or insert into the current selector (`&`), giving you an intuitive way to style the current element based on parent variants without repeating complex queries. Enables fully nested CSS writing styles and wealth of one's soul.

Currently available in [SASS 3.4](src/instyle.sass).  

```Sass
.app > main article

  .foo // let's style variations of .foo
    color: red

    &.ultimate
      transform: rotate(9001deg)

    +in('.app.unleashed article:hover')
      color: blue // .app.unleashed > main article:hover .foo { };

    +in('^.inserted')
      zoom: 1 // .app > main article .inserted .foo { };
```

```Sass
.app
  display: flex

  .sidebar
    flex-basis: 20vw

    nav
      display: block

      +in('.app.no-nav')
        display: none // .app.no-nav .sidebar nav { };

  main
    flex-grow: 1

    table
      table-layout: fixed

      tr
        border-bottom: 1px dashed #222

        +in('^thead')
          font-weight: bold // .app main table thead tr { };
```

String parameters are validated by SASS internal `selector-parse()`, so any errors in the attribute query will be reported on compilation.

## Modification
The `in()` query is mapped onto the current selector chain and any compound elements found are modified upwards of the current nest. Infinitely nestable, works together with nested media queries (example uses [include-media](http://include-media.com/)).

```Sass
.ultra-search
  display: block

  form
    height: 40px

    input
      width: 100%
      border-color: blue

      +in('form:hover')
        outline: blue // .ultra-search form:hover input { };

      +in('.ultra-search.invalid')
        border-color: red // .ultra-search.invalid form input { };

  .suggestion-list
    display: none

    +in('.ultra-search.is-open')
      display: block // .ultra-search.is-open .suggestion-list { };

      +media('<=tablet')
        height: 50vw
```

```Sass
.links
  list-style: none

  li
    display: block

    a
      line-height: 1.5

      +in('li:hover')
        color: blue // .links li:hover a { };

      +in('.links.with-flowers')
        background-image: url('flowers.png') // .links.with-flowers li a { };

        +in('li:hover')
          background-position: 10px 10px // .links.with-flowers li:hover a { };
```

## Insertion
The `^` caret at the beginning of compound selector signifies insertion, with each additional `^` character meaning one more level above the current element or preceding modification.

```Sass
.container
  display: flex

  div
    flex: 1

    span
      color: red

      +in('^.upside-down')
        transform: rotate(180deg) // .container div .upside-down span { };

      +in('^^[class^=foo] ')
        content: 'bar' // .container [class^=foo] div span { };
```

```Sass
ul,
ol
  list-style: none

    li
      display: block

      &.links
        display: inline-block

      a
        line-height: 1.5

        +in('ol:hover')
          color: red  // ol:hover li a { }; (removes irrelevant ul from group)

        +in('li.links:hover, ol.pictures')
          color: blue  // ul li.links:hover a, ol li.links:hover a, ol.pictures li a { };

        +in('ol:hover ^.pretty')
          font-size: 1.4rem  // ol:hover li .pretty a { };
          color: white
```

## Installation

`@import 'instyle'` in your SASS/SCSS stylesheet.

Ruby SASS compilation is required due to reliance on 3.4 features. Conversion to `libsass` should work out of the box once 3.4 is stable.

- Install Ruby - [Win](http://rubyinstaller.org/), [Linux](https://www.ruby-lang.org/en/documentation/installation/#package-management-systems)

- `gem install sass`

- `sass --watch test.sass:style.css`

## Roadmap

- Stylus port (blocked by [#1703](https://github.com/stylus/stylus/issues/1703))
