# inStyle

`inStyle` is a realistic, app-friendly methodology coupled with a unique system of describing elements by intuitively nesting all their relevant style properties, whether they are to be modified by a parent state, class, attribute, media query or else. Where other methodologies struggle to reflect the cold hard reality of CSS authoring, `inStyle` goes straight for the source. The ultimate ableism for code structure and readability, currently available in SASS (Stylus version coming).

## Methodology

_Optional, but recommended. The `inStyle` component is usable alone in SASS._

Use both native and custom elements for your abstract components.

```Html
<button>Save</button>

<dialog>
  <header>But...</header>
  <content>What about semantics?</content>
</dialog>

<message>
  <user>Ulf B.</user>
  <content>You thought your divs were semantical?</content>
</message>
```

Need a structural element? Use nameless divs and spans. CSS pseudoclasses and direct child selectors are powerful enough to describe even the most complex relations without having to use `.wrappers`. Try _not_ using classes that describe CSS functionality (aka `.pull-left`), this approach cannot scale.

```Html
<item>
  <div>
    ...
  </div>
  <div>
    ...
  </div>
</item>
```

```Sass
item
  display: flex

  > div:first-child
    flex: 0 0 100px

    +media('<tablet')
      flex-basis: 20vw

  > div:nth-child(2)
    flex: 1
```

Use CSS classes for component variants and abstracted design helpers.

```Html
<button class='save'>Save</button>
<dialog class='rounded'></dialog>
```

Reach parents and their states from anywhere in the current cascade to keep all attributes relevant to an element in the same place.  
Meet the `in()` function:

```Sass
content // below you're styling the <content> element in all it's forms
  font-size: 1.6rem

  +in('message, dialog')
    font-size: 1.2rem // message content, message content

  +in('message')
    color: #ccc
    font-weight: bold // message content

  +in('message:hover')
    font-weight: 600 // message:hover content

  +in('dialog')
    color: #999 // dialog content
```

The above is still possible to organize in CSS and post-processors, but it's not the prettiest syntax and in you need to repeat the full modified query to the current element. Consider the following HTML:

```Html
<links>
  <item>
    <img ... />
    <a href=''/>
    <description/>
  </item>
</links>
```

Let's say you need to change `a` color when `item` component is `:hover`ed and this is happening inside the `links` component. To make things better, you need another different variant in `header`. Nothing hard, but at best, you'll end up with this code:

```Sass
links
  display: block

  item
    display: block

    a
      line-height: 1.5

  &:hover

    a
      color: blue

      @at-root header &
        color: white
```

Notice how anchor is styled in two different places. Or worse:

```Sass
links
  display: block

  item
    display: block

    a
      line-height: 1.5

links item:hover a
  color: blue

header links item:hover a
  color: white
```

Now imagine adding some different media queries for these anchors. Such quite common CSS patterns can get very bad very fast.  
How about this instead:

```Sass
links
  display: block

  item
    display: block
    modern-property: 10px

    a // you're styling <a>
      line-height: 1.5

      +in('item:hover')
        color: blue  // links item:hover a (parent in current cascade)

      +in('header item:hover')
        color: white // header links item:hover a (partial parent match)

      +in('body.isIE7, .no-border-radius') // uh oh, but it could be anything
        modern-property: no-sorry
        zoom: 1
```

How does this work? If one of the compound selectors (eg. `item` in `item:hover` or `header`) is found in the current cascade, it's modified in the current selector nest. If not found, it's expected as a parent of the current selector. This greatly simplifies the syntax and readability when a property of the same element you're styling is modified due to a class, pseudoclass or attribute of a parent both in and out of the current cascade. A more complicated example:

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
          color: red  // ol:hover li a (removes irrelevant ul)

        +in('li.links:hover, ol.pictures')
          color: blue  // ul li.links:hover a, ol li.links:hover a, ol.pictures li a

        +in('footer')
          font-size: 1.4rem  // footer ul li a, footer ol li a
          color: white
```

Let's add media queries to the mix. It's provided by the wonderful [include-media](https://github.com/eduardoboucas/include-media), which allows very flexible and expressive conditioning and fits the nestable pattern perfectly - refer to its [documentation](http://include-media.com/#features) for details.

```Sass
article
  max-width: 960px

  +media('>phone', '<desktop')
    max-width: 480px

  +in('article-listing')
    height: 150px // article-listing article

    +media('<=phone')
      height: 10vh // @media screen and ( ... ) { article-listing article }
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
- Skinning pattern for independent components that can still inherit from base config
