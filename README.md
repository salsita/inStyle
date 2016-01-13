# inStyle

`inStyle` is system of describing elements by intuitively nesting all their relevant style properties, even if they are modified by a parent state, class, attribute or media query, both in and out of the current cascade.

Currently available in SASS 3.4.

## Why what?

Consider the following HTML:

```Html
<ul class='links'>
  <li>
    <img ... />
    <a href=''/>Title</a>
    <span>Description...</span>
  </li>
</ul>
```

Let's imagine the design requires you to change `a` color when its parent `li` element is `:hover`ed and this is happening inside your encapsulated `.links` component. To make things easier, your app has various layouts and you need your `a` to have a different `color` and `line-height` for the `.minimal` skin, which is propagated through a class on the `body` element.

Nothing hard to do, right? This could really be anything in your project - in essence you're changing the style properties of the same element in a few different scenarios, a pattern far too common in CSS authoring.

But at best, you'll end up with this code (using advanced SASS):

```Sass
.links
  list-style: none

  li
    display: block

    a
      line-height: 1.5

      @at-root .minimal &
        line-height: 1.2

    &:hover

      a
        color: blue

        @at-root .minimal &
          color: green
```

Or worse depending on your preferences, closer to plain CSS queries (still using SASS):

```Sass
.links
  list-style: none

  li
    display: block

    a
      line-height: 1.5

.links li:hover a
  color: blue

.minimal .links li a
  line-height: 1.2

.minimal .links li:hover a
  color: green
```

Notice how even for such a simple usecase, the `a` element is actually styled in four different places. It's already not very readable.

Let's complicate things further and add some media queries. On phones, your `li`s should be inline and the anchors have no underline, while on tablets there's a different link design altogether with `border-radius` and `background-color`.

Because why not, let's also go full hipster and support IE7 and use modernizr to determine vendor features. Our fancy `border-radius` on the tablet anchors won't work and needs an image as background fallback.

```
.links
  list-style: none

  li
    display: block

    a
      line-height: 1.5
      border-radius: 10px

      @at-root .minimal &
        line-height: 1.2

      @media (min-width:768px) and (max-width:1023px)
        color: white
        background-color: rebeccapurple
        border-radius: 10px

    &:hover

      a
        color: blue

        @at-root .minimal &
          color: white

    @media (max-width: 320px)
      display: inline-block

      a
        text-decoration: none

.isIE7, .no-border-radius
  .links li a
    background-image: url('link-bg.png')

```

We're quickly descending into exponential chaos for every modification we add.

Surely, we could move the styles for the `.minimal` skin, the media queries and old browser hacks into separate files to somewhat reduce the damage to this piece of code, but it's arguable to what degree this improves anything at all. Your styles for the `a` element would suddenly be in 4 separate files. The queries simply have to be _somewhere_ - where largely depends on your preference and there is no _correct_ solution to the issue.

However, we can clearly see that the common denominator in all these cases is the `a` element. For the most part, it's just extremely inconvenient to correctly describe the DOM relations that lead to its property changes.

What if we could do this instead?

```Sass
.links
  list-style: none

  li
    display: block

    a
      line-height: 1.5

      +in('.minimal')
        line-height: 1.2 // .minimal .links li a { };

      +in ('li:hover')
        color: blue // .links li:hover a { };

        +in('.minimal')
          color: green // .minimal .links li:hover a { };

```




Now imagine adding some different media queries for these anchors and working with more elements. Such rather common CSS patterns can get very bad very fast, decreasing readability and maintainability.

What if you could do this instead?

```Sass
links
  display: block

  item
    display: block
    modern-property: 10px

    a // further you're always styling a in links item
      line-height: 1.5

      +in('item:hover')
        color: blue  // links item:hover a { }; (parent in current cascade)

      +in('header item:hover')
        color: white // header links item:hover a { }; (partial parent match)

        +in('.minimal')
          font-size: .8rem  // .minimal header links item:hover a { };

      +in('.isIE7, .no-prop') // .isIE7 links item a, .no-prop links item a { };
        modern-property: no-sorry
        zoom: 1
```

How does this work?

If one of the compound selectors (eg. `item` in `item:hover` or `header`) is found in the current cascade, it's modified by the intended state. If not found, it's expected as a parent of the current selector. Infinitely nestable.

This greatly simplifies the syntax and readability when a property of the same element you're just styling is modified due to a class, pseudoclass or attribute of a parent both in and out of the current cascade. _(How about it all belongs the actual element!)_

Different example:

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
          color: red  // ol:hover li a { }; (removes irrelevant ul)

        +in('li.links:hover, ol.pictures')
          color: blue  // ul li.links:hover a, ol li.links:hover a, ol.pictures li a { };

        +in('footer')
          font-size: 1.4rem  // footer ul li a, footer ol li a { };
          color: white
```

Let's add media queries to the mix. It's provided by the wonderful [include-media](https://github.com/eduardoboucas/include-media), which allows very flexible and expressive conditioning and fits the nestable pattern perfectly - refer to its [documentation](http://include-media.com/#features) for details.

```Sass
article
  max-width: 960px

  +media('>phone', '<desktop')
    max-width: 480px

  +in('article-listing')
    height: 150px // article-listing article { };

    +media('<=phone')
      height: 10vh // @media screen and ( ... ) { article-listing article { ... }; }
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

`inStyle` currently requires Ruby SASS due to reliance on latest 3.4 features. Conversion to `libsass` will be immediate once 3.4 is stable.

- Install Ruby - [Win](http://rubyinstaller.org/), [Linux](https://www.ruby-lang.org/en/documentation/installation/#package-management-systems)

- `gem install sass`

- `npm install`

- `gulp`

`main.sass` should be your central point for importing individual components.
Build paths can be changed in `gulpfile.js`.
The build process also autoprefixes properties and optimizes/minifies your selectors and media queries. **Note:** The build process is only necessary for the iconfont component, you can freely import the SASS stack standalone or use the core SASS `instyle` package alone.

## Components

`inStyle` comes with a few hopefully unobtrusive components to get you started on a project.

### Base

Base uses [normalize.css](https://github.com/necolas/normalize.css/) or optionally [Meyer reset](http://meyerweb.com/eric/tools/css/reset/) and can serve as a scaffold for your app/page. Defines industry standard `body` and `html` elements.

### Iconfont

The `gulp` build process automagically converts all your `.svg` icon sources in `components/icons` into a webfont and renders the `icons.sass` component. That allows you to easily use custom icons on pseudoelements without tainting HTML with `.icon-somethign` classes - variable names are created for each icon based on filename.

```Sass
// hamburglar.svg

button:before
  +icon($icon-hamburglar)
```

## Roadmap

- Stylus port
- Improved framework-specific animation components
- Default basic components? (buttons etc.)
- Skinning pattern for independent components that inherits from base config
