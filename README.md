# inStyle

`inStyle` is a CSS authoring tool to append, insert or replace elements in the current selector (`&`), giving you an intuitive way to style the current element based on parent variants without repeating complex queries. Enables fully nested CSS writing styles and wealth of one's soul.  

Article: https://css-tricks.com/instyle-current-selector-sass/

Currently available for [SASS 3.4+](src/instyle.sass).

**What's new** in 1.6.0:
- parser rewrite with lots of improvements and fixes
- all targets now always work from base index (vs last modified element index)
- no restrictions on selector flow and order of modifications
- better namespacing for config variables (`$__tagAppend` > `$__inTagAppend` etc.)
- tolerance to extra spaces in mixin parameters
- minor optimizations for faster compile and simplified error reporting

## 1) Append

Appending a state to an existing parent is done with the `<` special character. Each additional use of this character targets a higher parent (works the same for all features).

```Sass
.my-app
  display: block

  .widget
    border-radius: 5px

    &.blue
      color: blue

    .isIE6 &
      background-image: url("fake-borders.png")

    +in('<.expanded')
      color: red // .my-app.expanded .widget { };

    @media (max-width: 768px)
      float: left
```

 You can also explicitly mention the compound selector, which is useful for filtering out undesired multiselector parents. May also be preferential for readability.

```Sass
ul, ol
  list-style: none

  li
    display: inline-block

    a
      text-decoration: underline

      +in('ol.links')
        color: orange // ol.links li a { };
```

## 2) Insert

Inserting a new selector at a certain position above the current element is done with the `^` special character.

```Sass
.container
  display: flex

  div
    flex: 1

    span
      color: red

      +in('^.upside-down')
        transform: rotate(180deg) // .container div .upside-down span { };

      +in('^^[class^=foo]')
        content: 'bar' // .container [class^=foo] div span { };
```

```Sass
table
  table-layout: fixed

  thead
    font-weight: normal

  tr
    height: 30px

    +in('^thead')
      height: 50px // table thead tr { };
```

## 3) Replace

Replacing a certain selector is done using the `@` character. Multiselectors that become duplicit due to the replacement are removed from the rendered selector.

```Sass
ul, ol
  list-style: none

  li
    display: inline-block

    a
      text-decoration: underline

      +in('@.cool')
        background: pink // ul .cool a, ol .cool a { };

      +in('@@.special-list')
        color: orange // .special-list li a { };
```
## Features

- Infinitely nestable
- Any amount of modifications separated by a space
- Accepts multiselectors separated by a comma
- Validates all CSS input by SASS internal `selector-parse()`
- Order of modifications makes no difference, RTL priority

## Options

Change any of the special characters to your preference by setting the following global variables:

`$__inTagAppend: '<'`  
`$__inTagInsert: '^'`  
`$__inTagReplace: '@'`

## Installation

`@import 'instyle'` in your SASS/SCSS stylesheet.

Ruby SASS compilation is required due to reliance on v3.4 features.

- Install Ruby - [Win](http://rubyinstaller.org/), [Linux](https://www.ruby-lang.org/en/documentation/installation/#package-management-systems)

- `gem install sass`

- `sass --watch test.sass`

inStyle is also available on Bower and NPM:

`npm install inStyle`  
`bower install inStyle`

## Tests

`npm install`  
`npm run test`

## Roadmap

- Stylus port (blocked by [#1703](https://github.com/stylus/stylus/issues/1703))
