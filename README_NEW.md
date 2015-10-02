# chili

`chili` is a UI skeleton framework/seed that embraces natural HTML5 concepts and the wonderful syntax sugar of Stylus to simplify and beautify the way you write CSS.

## Why use it?

Enjoy a balls to the wall simple code architecture.  
Write nested states for all things, making your source cleaner and better structured.

```
+component('form')
  border 1px solid black

  +component('input')
    font-family inherit

    +state(':invalid') // state of input
      border-color red

    +state('[disabled]', form) // state of form influencing input
      opacity .5
      pointer-events none

    +media(tablet) // media query for input in form
      width 90%
```

Use your preferred namespacing methodology, no matter how ridiculous it is. Optional global prefixing of components, variants and states is configurable (does not prefix pseudoclasses).
```
+component('#+--__xXxDeAtHlOrDxXx__--+')
	transition transform

	+variant('.__360--noscope')
		transform rotate(360deg)
		zoom 1 !important
```

Use meaningful embedded functions to craft fundamental CSS relations quickly and keep the source footprint minimal and well readable. Or not, you don't have to.
```
+component(header)
  size(block, 100%, 200px)
  position(fixed, top, left)

  .logo
  	hide-text()
    background-retina(logo.png, 200px)

  nav
  	size(50%, 100%)
  	position(float, right)
    distribute-flex(left, center)
    indent-children(right, bottom, 10px)
```

## Installation

`npm install`  
`gulp`

## Features

### Components

In semantic HTML, components are best defined by their nodeName (element type) or by their assigned WAI-ARIA role. The following would produce the same visual design for all matches (the `reset()` mixin stripping element defaults):

```
+component('button .button [role=button]')
	reset()
	display inline-block
```

```html
<button>Login</button>
<a role='button' href='/login'>Login</a>
<span class='button'>Login</span>
```

### Variants



### States

In semantic HTML, state of a component is defined by its pseudoclass and/or attributes. Since pseudoclasses cannot be modified, we can still make of use custom attributes or traditional classes to carry custom state values. The `state` block extend provides a unified wrapper for this intention that can apply either to the current element or any of its parent components that were defined earlier in the chain, body or html.

```
+component('button')
  +state(:hover :focus)
    background blue
  +state([disabled])
    background grey
    pointer-events none
  +variant('.ajax-submit')
  	+state(.nojs, body) // changes button
    	display none
```


### Variants



### Automation





### Mixins
