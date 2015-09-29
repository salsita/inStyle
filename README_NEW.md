# chilli-seed

`chilli-seed` is a UI skeleton framework that embraces natural HTML5 concepts and Stylus features to simplify and beautify the way you write CSS.

## Why use it?

Write nested states and media queries, making your source cleaner and better structured.  

```
+component(form)
	border 1px solid black

	+component(input)
		font-family inherit

		+state(:invalid) // state of input
			border-color red

		+state(.disabled, form) // state of form influencing input
			opacity .5
			pointer-events none

		+media(tablet) // media query for input in form
			width 90%
```

Use embedded functions to craft fundamental CSS relations quickly and keep the source footprint minimal.

```
+component(header)
	size(block, 100%, 200px)
	position(fixed, top, left)

	.logo
		background-retina(logo.png, 200px)
		hide-text()

	.right-side
		distribute-flex(left, center)
		indent-children(right bottom, 10px)

```

## Installation

`npm install`  
`gulp`

## Features

### Components

In ideal semantic HTML, components are defined by their nodeName (element type) or by their assigned WAI-ARIA role. By default, a component is created as an element only, but the following is equivalent and produces the same design for all usecases:

```
+component(button, element role class)
	display inline-block
```

```html
<button>Login</button>
<a role='button' href='/login'>Login</a>
<span class='button'>Login</span>
```

### States

In ideal semantic HTML, state of a component is defined by its pseudoclass and/or attributes. Since pseudoclasses cannot be modified, we can still make of use custom attributes or classes to carry additional state values.

```
+component(button)
	+state(:hover :focus)
		background blue
	+state(.disabled [disabled])
		background grey
```


### Variants



#### Base



### Mixins
