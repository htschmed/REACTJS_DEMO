Introduction
=============
This is a small demo application that showcases the JavaScript library ReactJS developed by [Facebook Inc.](https://www.facebook.com/)  The purpose of the framework is to create interactive user interface widgets using building blocks called **components**.  Each component maintains it's own internal state and can be composed with other components to create more complex UIs.

ReactJS allows for the use of a JavaScript extension called **JSX**.  This extension gives developers the ability to write HTML style syntax directly into their JavaScript code without the need of creating formatted strings or utilizing a third party templating engine.  

**Example JSX file would look like the following...**

```jsx
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<HelloMessage name="John" />, mountNode);
```

**and the compiled JavaScript...**

```javascript
"use strict";

var HelloMessage = React.createClass({
  displayName: "HelloMessage",

  render: function render() {
    return React.createElement(
      "div",
      null,
      "Hello ",
      this.props.name
    );
  }
});

ReactDOM.render(React.createElement(HelloMessage, { name: "John" }), mountNode);
```

You may also view the complete tutorial provided by [Facebook Inc.](https://www.facebook.com/) by clicking on the link below:

[Facebook Tutorial](https://facebook.github.io/react/docs/tutorial.html)

Enviroment Setup
================
In order to run the demo your enviroment requires the following packages:

* [Python](https://www.python.org/) version 2.7.9 or greater.
  * [Tornado Web Framework](http://www.tornadoweb.org/en/stable/) version 4.4.1 or greater

If you do not have the above packages installed, visit the above links to learn more about how to download and install the prerequisites

In order to modify and *experiment* with the source you will need to have a JavaScript transcompiler either compile the script code on the client side using something like [Babel 5](https://babeljs.io/) in-browser ES2015 and JSX transformer.  This can be found at [CDNJS](https://cdnjs.com/libraries/babel-core/5.8.34), use this script tag to trigger the transformer.
```html 
<script type="text/babel">
```

You may also precompile ReactJS files using the [Babel](https://babeljs.io/) compiler.  If you have [npm](https://www.npmjs.com/) installed, you can run:

`npm install -g babel-cli`.

You should also include the ES2015 and React presets by running:

`npm install babel-preset-es2015 babel-preset-react`

Once installed [Babel](https://babeljs.io/) can be set up to monitor and compile a directory by running:

`babel --presets es2015,react --watch src/ --out-dir lib/`

Launching The Application
=========================
To run the application, from your shell enviroment navigate to the project directory and type:

`python main.py`

This will spin up the development web server and you can view the application by opening up your favorite web browser and navigating to [http://localhost:7777](http://localhost:7777) to view the sample application in action.