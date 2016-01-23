# inStyle

`inStyle` gives you an intuitive way to modify current selector parents, enabling fully nested CSS development pattern for styles of your element.
A powerful replacement for `&`.

Big friend of nestable media queries.


Currently available in [SASS 3.4](src/instyle/core.sass).

Recommended with: [include-media](https://github.com/eduardoboucas/include-media)

```Sass
.app > main article div:first-child
  span.thing // let's style span.thing
    color: red
    +in('.app.unleashed article:hover')
      color: blue // .app.unleashed > main article:hover div:first-child span.thing { };
    +in('.isIE4') // .isIE4 .app > main ... span.thing { };
      zoom: 1
```

## Examples

```Sass
.links
  list-style: none

  li
    display: block

    +in('footer')
      display: inline-block // footer .links li { };

    a
      line-height: 1.5

      +in('li:hover')
        color: blue // .links li:hover a { };

      +in('.minimal')
        line-height: 1.2 // .minimal .links li a { };

      +in('.links.with-flowers')
        background-image: url('flowers.png') // .links.with-flowers li a { };

        +in('li:hover')
          background-position: 10px 10px // .links.with-flowers li:hover a { };

      +in('footer')
        color: white // footer .links li a { };

      +in('footer li:hover')
        text-decoration: underline // footer .links li:hover a { };
```

How does this work?

If some of the compound selectors inside `in()` are found in the current cascade, they're modified by the additional queries. If not found, they're expected to be a parent of the current selector and prepended instead.

Stops at first best match upwards from the current selector and can modify multiple separate compound selectors at the same time. Infinitely nestable, accepting multiple queries and excluding any invalidated parent group selectors.

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

        +in('footer')
          font-size: 1.4rem  // footer ul li a, footer ol li a { };
          color: white
```

```Sass
.ultra-search
  display: block

  > div
    height: 40px

    input
      width: 100%
      border-color: blue

      +in('div:hover')
        outline: blue

      +in('.ultra-search.invalid')
        border-color: red

  .suggestion-list
    display: none

    +in('.ultra-search.is-open')
      display: block
```

Let's add media queries to the mix. [include-media](https://github.com/eduardoboucas/include-media) is recommended, as it allows very flexible and expressive conditioning and fits the pattern and code style - refer to its [documentation](http://include-media.com/#features) for details.

```Sass
article
  max-width: 960px

  +media('>phone', '<desktop')
    max-width: 480px

  +in('.article-listing')
    height: 150px // .article-listing article { };

    +media('<=phone')
      height: 10vh // @media screen and ( ... ) { .article-listing article { ... }; }
```

```Sass
item
  display: flex

  > div:first-child
    flex: 0 0 100px

    +media('<tablet')
      flex-basis: 20vw

      +in('.inverted')
        order: 2  // @media ( ... ) { .inverted item > div:first-child { ... }; }

  > div:nth-child(2)
    flex: 1
```

## Installation

`@import 'instyle'` in your SASS/SCSS stylesheet.

Ruby SASS compilation is required due to reliance on 3.4 features. Conversion to `libsass` should work out of the box once 3.4 is stable.

- Install Ruby - [Win](http://rubyinstaller.org/), [Linux](https://www.ruby-lang.org/en/documentation/installation/#package-management-systems)

- `gem install sass`

## Roadmap

- Stylus port (blocked by [#1703](https://github.com/stylus/stylus/issues/1703))
