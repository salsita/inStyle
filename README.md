# inStyle

`inStyle` is a system of describing elements by intuitively nesting all their relevant style properties, even if they are modified by a parent state, class, attribute or media query, both in and out of the current cascade.

Currently available in SASS 3.4.

## Why what?

Consider the following HTML:

```Html
<ul class='links'>
  <li>
    <img ... />
    <a href='#'>Title</a>
    <span>Description...</span>
  </li>
</ul>
```

Let's imagine your design requires you to change `a` color when its parent `li` element is `:hover`ed and this is happening inside your small reusable `.links` component. To make things easier, your app has various skins and views (ex: `<body class='minimal'>`) that change the design of anchors while using the same HTML.

Nothing hard to do, right? This could really be anything in your project - in essence you're changing the style properties of the same `a` element in a few different scenarios, a pattern far too common in CSS authoring.

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

    &:hover a
      color: blue
```

Or worse depending on your preferences, closer to plain CSS queries:

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
```

Notice how even for such a simple usecase, the `a` element is actually styled in three different places. It's already not very readable and it's quite easy to make things even worse.

Your designer wears a Banksy t-shirt, so let's add more design. Our links are different in footer, they're inline and white. There's also an alternate version of `.links.with-flowers` for the annual flower appreciation day. 

```Sass
.links
  list-style: none

  li
    display: block

    a
      line-height: 1.5

      @at-root .minimal &
        line-height: 1.2

    &:hover a
      color: blue

.links.with-flowers li a
  background-image: url('flowers.png')

.links.with-flowers li:hover a
  background-position: 10px 10px // because it's cool

footer
  .links li
    display: inline-block

    a
      color: white
```

Even though we're leveraging some pretty SASS, we're still quickly descending into exponential chaos for every modification we add, changing the same element in more and more places.

Surely, we could move the styles for the skin, the media queries, the flower hacks and footer specific stuff into separate files to somewhat reduce the damage to this piece of code, but it's arguable to what degree this improves things. Your styles for the `a` element in your wannabe-standalone `.links` component would suddenly be in five separate files.

Part of the problem is that there are no convenient tools to correctly describe the DOM relations that lead to the style changes of our precious `a` - whether it's because of its parents in the cascade being hovered or a stateful class changing things around. In such cases, we need to target the same element in a new query.

So what about this instead?

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
        color: blue // .links li:hover a { }; (parent is found and modified)

      +in('.minimal')
        line-height: 1.2 // .minimal .links li a { }; (parent not found, prepending)

      +in('.links.with-flowers')
        background-image: url('flowers.png') // .links.with-flowers li a { };

        +in('li:hover')
          background-position: 10px 10px // .links.with-flowers li:hover a { };

      +in('footer')
        color: white // footer .links li a { };
```

How does this work?

If one of the compound selectors (eg. `li` in `li:hover` or `.links`) is found in the current cascade, it's modified by the intended state. If not found, it's expected as a parent of the current selector. Infinitely nestable, accepting multiple properties, modifying any amount of parents.

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

- LESS port possible?
- Stylus port
- Improved framework-specific animation components
- Default basic components? (buttons etc.)
- Skinning pattern for independent components that inherits from a base config
