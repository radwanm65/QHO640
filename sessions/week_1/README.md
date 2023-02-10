# Practical Session and Guided Learning

By the end of this week you should be able to answer the following questions:

- What are the latest features of JavaScript?
- How can I package a modern JavaScript application?

<iframe src="https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=eac06dd3-4f6d-4f91-9de8-ac46013224e0&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>

>> Task two walk through 

The purpose of this session is to ensure that everyone is up-to-speed with the latest version of JavaScript. To achieve this, we are going to work through the perennial [TodoList](https://github.com/tastejs/todomvc/) exercise.

In this session, we are focussing on vanilla JS; however, from next week onwards we will be using React.

## Session Dependencies
- [You will need to ensure you have the version control tool Git installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)    
- You will need to ensure that you have installed [node.js](https://nodejs.org/en/)
- While you can use any text editor for this session, I recommend that you install [VS Code](https://code.visualstudio.com/download)

:::tip

## TASK 1 :book:

[Read the about the latest version of JavaScript](https://www.greycampus.com/blog/programming/java-script-versions)

::::

## Package and Build Management

<iframe src="https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a6ae72f5-35a1-4843-9dec-ac460132246b&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>

>> Why we need a build tool

In order to package our application we need to a build tool, [WebPack](https://webpack.js.org/) is currently the most popular tool.****

> > At its core, WebPack is a static module bundler for modern JavaScript applications. When WebPack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles. (WebPack, 2020)

![](./assets/webpack-architecture.png)

> > Figure 1, a typical single page web application architecture.

## Why do we even need WebPack?

<iframe src="https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=92986265-8a7d-4278-a843-ac46013224aa&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>

>> Task 3 - 7 walk through

To understand why we need a tool such as WebPack, we must first consider a modern web application architecture and the practical goals of this unit.

Figure 1, represents the overarching practical project that we will be working on throughout these sessions. We are going to be creating this application on a **single page**. This type of application architecture is appropriately known as a single page application (SPA).

Using an SPA approach, the browser loads a single page, along with what's known as a JavaScript bundle. There is no need for further page reloads as the `bundle.js` file contains nearly everything the browser will need for the given session.

This approach minimises HTTP requests and user wait time; however, the major drawback is search engines can not easily differentiate between pages in your application. This may not be a problem if the application is behind a login screen, as there is no need to appear in the search engines. If this is not the case, the solution is server-side rendering or pre-rendering, these are advanced topics that you should be aware of, but we will not cover them in your practical.

It would not be practical for developers to construct or work on a bundle file as it may bundle together many hundreds of dependencies. WebPack is the solution to this challenge, it allows us to bundle together multiple JavaScript files and assets.

> > When webpack processes your application, it starts from a list of modules defined on the command line or in its config file. Starting from these entry points, webpack recursively builds a dependency graph that includes every module your application needs, then bundles all of those modules into a small number of bundles - often, just one - to be loaded by the browser. (webpack, 2020)

Let's explore the above ideas by starting this weeks practical - a todo list application.

:::tip

## TASK 2 :rocket:

- Clone the following repository `https://github.com/joeappleton18/todo-list-tutorial`
- Open the resulting `todo-list-tutorial` in VS code
- Install the dependencies, `npm install`
- Open `package.json` and work out how to run the defined scripts to:
  - run project in development mode
  - create a development build
  - create a production build

::::

If you open up `index.html` there is simply a placeholder div, `<div id="app"></div>` for our application. Such a set up is typical of a SPA, we have a single element that the entire application is injected into.

## ES6 modules

<iframe src="https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=47179bca-5915-40c7-a6fd-ac4601322510&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>

ES6 modules allow us to comparmentalise our code into reusable components - let's explore this idea that is used heavily in modern JavaScript development.

:::tip

## TASK 3 :rocket:

In your `js` directory create a file called `todos.js`. Add the following code:

```js
const todos = [
  {
    id: "1",
    text: "Complete My Assessment",
    created: "Wed Jan 22 2020 07:02:0",
    completed: false,
  },
  {
    id: "2",
    text: "Complete My Assessment",
    created: "Wed Jan 22 2020 07:03:0",
    completed: false,
  },
];

export default todos;
```

In the above example, by exporting our constant containing the todo list array we make it available to our wider application. Notice how we use the keyword `default` we can only have a single default export per file.

We can use `todos` in `main.js` by importing it by using the following code:

```js
import todos from "./todos";
console.log(todos);
```

Try the above yourself.

In the above example, we are importing `todos` which we can access through the var `todos`. As `todos` is a default export, we could change the var name, e.g. `import td from "./todos";`

Before moving on, experiment with:

- exporting and importing a function (e.g. one that squares numbers)
- exporting and importing multiple imports.

:::

At the moment our application does not resemble a todo list, in-fact, there is nothing rendered - let's change this.

::: tip

## TASK 4 :rocket:

- An amazing feature of webpack is that, by using different loaders, it allows us to treat a wide range of different assets as JavaScript modules - odd, but very useful. Case in point, add the following lines of code to the top of `main.js`:

```js
import "./main.css";
import img1 from "../assets/top-left-elips.png";
import img2 from "../assets/bottom-right-elips.png";
```

- In `main.js` create a function called `render()` that logs to the console "ready"
- Set the following event listener that ensure render only runs when the DOM is loaded, `window.addEventListener('DOMContentLoaded',render);`
- Below is a constant containing an object literal. Work out how you would, within the `render()` function set the innerHTML of `index.html`'s `<div id="app"></div>` to this value. Notices how the `src` attribute of the `img` tags are vars base on the above imports!

```js
const view = ` <img
src="${img1}"
id="background-left"
alt="background"
/>
<img
src="${img2}"
id="background-right"
alt="background"
/>

<div class="wrapper">
<div class="todolist">
  <h1>WEB DESIGN STUDENT TO DO LIST</h1>
  <input type="text" id="todoInput" placeholder="What do you need to do today...." />
  <div class="list">
  </div>
  <!-- /.list -->
</div>
<!-- /.todolist -->
</div>
<!-- /.wrapper -->`;
```

:::

::: details Click me to view the solution
```js
function render() {
	document.querySelector('#app').innerHTML = view;
}
```
:::

## Breaking Down an Application Into Components

Destructuring is a further concept that is used widely in modern JavaScript. Let's explore this idea with a further exercise.

:::tip

- It would be nice to not have the majority of our functionality in `main.js`. With this in mind, let's create a separate file that is responsible for rendering a single todo item on our todo list.
  Set up the following folder structure 'js/Components/Todo'
  Within `Todo` create `index.js`.

- Add the following `

  ```js
  const Todo = (text, id) => `<div class="outer-item" id="outer-item-${id}" >
    <div class="to-do-item">
    <p> ${text} </p>
    <span class="close" data-outer-item="${id}" >  X </span>
    </div>
    <!-- /.to-do-item -->
    </div>
    <!-- /.outer-item -->`;
  export default Todo;
  ```

- I've defined a function here, using the lamda syntax, it is often called an arrow function - if you don't know, you should ensure you research how this is working.

- A very nice property of our project structure, use of `index.js` and default export is we can import the `Todo` function in `main.js` like this, `import Todo from './Components/Todo';`. Go ahead and add the import statement to the top of your `index.js` file.
  :::

## Array Operations

You should know what an array is - it is a data structure represented by `[]`. We have already used arrays, our todo list is an array of object literals:

```js
const todos = [
  {
    text: "Complete My Assessment",
    created: "Wed Jan 22 2020 07:02:0",
    completed: false,
  },
  {
    text: "Complete My Assessment",
    created: "Wed Jan 22 2020 07:03:0",
    completed: false,
  },
];
```

Arrays, come with inbuilt operations that we can run on them. For instance, `todos.reverse()` will reverse the array for me. Some of the most useful features are operations that allow me to iterate across the entire array and construct a new array. A slightly odd concept, however, one you will become very familiar with. The key operations are `map`, `reduce`, `filter` and `find`. Let's consider `map` in the context of our todo list

```js
const newArrayJustText = todos.map((i) => item.text);
console.log(map); //  ['Complete My Assessment','Complete My Assessment'];
```

As you can see, map is a function that takes, as an argument, a function. The function, on each iteration, gets passed an array element. I then return the parts of that element that will be used to construct a new array - let's take this further

:::tip

## TASK 5 :rocket:

- Within your `main.js` render function add the following lines of code:

```js
let htmlList = todos.map((item) => Todo(item.text, item.id));
document.querySelector(".list").innerHTML = htmlList;
```

- As if by magic you now have a todo list
- Can you see the annoying comma that is printed to the DOM ? - work out how to remove this.

:::

## Spread Operator

We need to push and remove todos from our `todolist`; however, notice how it is a constant. This means that, after definition, it can't be changed - a concept known as immutability.

Immutability is a good thing, it allows us to consistently rely on values as they are passed around our program. Instead of modifying immutable values we make copies of them.

You may logically think you could do the following:

```js
const array_1 = [1, 2, 3, 4, 5, 6];
let array_2 = array_1;
array_2.push(7);
console.log(array_1);
console.log(array_2);
```

:::tip

## TASK 6 :rocket:

The above operates in a strange way, copy and paste the code snippet into codepen or your debug console and find out why.

:::

To make a copy of an array we can use the spread operator `...` . This is how it is used:

```js
const array_1 = [1,2,3,4,5,6]
const array_2 = [....array_1, 7]
```

In the above example, we are not modifying `array_1`. Instead, we are using the spread operator to compose a new array.

In the example below we use the spread operator to create a new array when a TODO list item is removed.

```js
window.addEventListener("DOMContentLoaded", render(todos));

function render(todos) {
  const tds = [...todos];
  const handleCloseClick = (e) => {
    render(tds.filter((c) => e.target.dataset.outerItem != c.id));
  };

  document.querySelector("#app").innerHTML = view;
  let htmlList = todos.map((item) => Todo(item.text, item.id));
  document.querySelector(".list").innerHTML = htmlList.join(" ");
  document
    .querySelectorAll(".close")
    .forEach((e) => e.addEventListener("click", handleCloseClick));
}
```

:::tip

## TASK 7 :rocket:

Complete the todo list so we can add new todos.  

:::
