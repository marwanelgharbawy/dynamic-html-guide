# Creating a dynamic webpage with EJS Templating

This mini guide will help you through creating dynamic webpages using EJS templating.

EJS is like HTML but upgraded, you can pass data to them and use JavaScript logic inside of it. This allows you to create templates for your webpage, changing particular details by passing data to these files.

## Required: Express
Install Express:
```bash
npm i express
```
and then at the start of the `index.js`:
```js
const express = require("express")
const app = express()
```

## Configuring Express for EJS

Install EJS: 
```bash
npm i ejs
```

You'll also have to include this line in your `index.js`
```js
app.set('view engine', 'ejs')
``` 

## Setting up the views directory 

Create a `views` directory in your workspace, this is where you'll start adding your EJS files.
```js
app.set('view engine', 'ejs')
``` 

If you're running the server from another directory, include this line to prevent any errors
```js
const path = require("path")
app.set('views', path.join(__dirname, '/views'))
``` 

## EJS syntax

There's a VS Code extension for snippets and syntax highlighting, also refer to the [EJS documentation](https://ejs.co/#docs) yourself.

## Rendering a webpage

First create your EJS file in the `views` directory and start writing basic HTML stuff. With that ready, you can start using the render method from express. In this example I've created a `home.ejs` file and rendered it like that:
```js
app.get('/', (req, res) => {
    res.render("home") // Rendering an EJS file
})
```

## Passing data to templates
You can pass data to templates by specifying another argument with the render method, it has to be an object with the variable created. In this example, I've generated a random number and passed it to a `random.ejs` file:
```js
app.get('/random', (req, res) => {
    ran = Math.floor(Math.random() * 10) + 1
    res.render('random', { random: ran })
})
```
You now have access to a variable named `random` (NOT RAN) in your EJS file.

To avoid confusion, you can do the following and it works fine:
```js
app.get('/random', (req, res) => {
    random = Math.floor(Math.random() * 10) + 1
    res.render('random', { random })
})
```

To use the variable in the EJS file, you'll have to surround it with these tags `<%= %>` like this:
```html
<h1>Your random number is <%=random%></h1>
```

## JavaScript logic in EJS

Conditionals and loops can be applied in EJS, you need to surround your code with `<%= %>` tags FOR EACH LINE.
```html
 <% if (random % 2==0) { %>
    <h3>it's even!</h3>
<% } else { %>
    <h3>it's odd!</h3>
<% } %>
```

If you have the VS Code extension. it's better to use their snippets quicker.

You can do the same for loops, assuming you passed an array of `friends`
```html
<% for( let friend of friends ) { %>
    <li><%= friend %></li>
<% } %>
```

## Serving static assets in Express

You can add CSS or JavaScript files to your webpage by specifing the include path, an example for including a directory named `public`:
```js
app.use(express.static('public'))
```
You can normally include any file you want as you usually do, by including the link in the HTML head, in this example we're including bootstrap:
```html
<link rel="stylesheet" href="css/bootstrap.min.css">
<script src="js/bootstrap.min.js"></script>
```

Again if you're running the server from a different directory, you can do the same thing we did for the `views` directory.
```js
app.use(express.static(path.join(__dirname, '/public')))
```

## Partials

You can add blocks of HTML using the include statement, this can be really helpful if you want to change the includes or the navbar for the webpage. 

First, you need to create a directory for the partials within the `views` directory, and then have the reocurring HTML chunks in an RJS file, like the head for example, you can even include the `<body>` opening tag. For example, that could be the content of a `head.ejs` file:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Friends</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <script src="js/bootstrap.min.js"></script>
</head>

<body>
```

You can now delete this part from all your EJS files and include this block of code using this include line:
```js
<%- include('partials/head') %>
```

You can do the same thing for a footer and have the `</body>` and `</html>` closing tags, and you can write your EJS files like this:

```html
<%- include('partials/head') %>
    <h1>Welcome, <%= username %></h1>
<%- include('partials/footer') %>
```

## How useful is it?

Given a database, you can display for example the same details of different people based on their id or something. Imagine passing an object and then in the EJS file you use the `object.name` and then `object.age` depending on the passed object.

### Test my code:
Clone this repository and run `npm install` and try modifying stuff `:)`
