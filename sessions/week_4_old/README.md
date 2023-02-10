<!-- # State Management and React Routing

<iframe src="https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7fd1a922-0eee-4327-b817-ac67014220d4&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>


>> Full Solution Walk Through

:::warning Dependencies


## Session Dependencies

This practical assumes you are up-to-date with the homework from last week.
[If, for whatever reason you have fallen behind, you can get the latest solution from my github repository](https://github.com/joeappleton18/contemp-web-app-solutions.git). You should note that I have gone a little further and created the menu, you may just want to work with my version of the project.

[You will also need to access the mockup for these practical sessions](https://www.figma.com/file/rTbqRpRWOw7UYg28SBcxQv/web-dev-pratical-task-made-using-toxin-ui?node-id=31264%3A79).

:::


:::warning Reading

### Essential Reading :closed_book:

[The React documentation on state](https://reactjs.org/docs/state-and-lifecycle.html)
[React State Hooks](https://reactjs.org/docs/hooks-overview.html#state-hook)
[Component Communication](https://www.pluralsight.com/guides/react-communicating-between-components)

:::


This week we are moving away from styling and looking into the idea of state and state management. We will be addressing the question:

**How can we manage the complex ever changing state of a web application?**

## What is State?

State can be considered the values that your application maintains, **specifically the values in your application that can change**. Change in your application is, normally, triggered by some event. As such, we must explore how events are handled in React and then we can understand how we can respond to these events and update state.

## Handling Events

Handling events in React is very similar to using vanilla JavaScript. According to the React documentation, there are the following differences:

>  - React events are named using camelCase, rather than lowercase
> - With JSX you pass a function as the event handler, rather than a string
> - With JSX you pass a function as the event handler, rather than a string

```JavaScript
import React from "react";

export default function App() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
  };

  return (
    <div className="App">
      <p> you clicked count 10 times </p>
      <button onClick={handleClick}> Click me </button>
    </div>
  );
}
```

In the above example `handleClick()` gets called when the button is clicked. Under-the-hood, React passes `handleClick()` to an, ["instances of SyntheticEvent, a cross-browser wrapper around the browser’s native event."](https://reactjs.org/docs/events.html).

## Managing State

Considering the above example, it is clear that we need to manage the state of the counter. The counter will form our component level state. To manage component level state, in a functional component, we need to use the [React State Hook](https://reactjs.org/docs/hooks-state.html).

>> [Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.](https://reactjs.org/docs/hooks-state.html)


Let's expand on our above example to consider how the state hook is used:

```JavaScript

import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = e => {
    e.preventDefault();
    setCount(count + 1);
  };

  return (
    <div className="App">
      <p> you clicked count {count} times </p>
      <button onClick={handleClick}> Click me </button>
    </div>
  );
}
```

In the above example, there are a few things that I need to unpack:

First, you can see that we are importing the react useState hook: `import React, { useState } from "react";`

Next, we use `useState` to set some state: `const [count, setCount] = useState(0);` -  this syntax may be a little odd to you. To understand what is going on we must first consider what `useState(0)` returns.

`useState(0)` will return an array, containing two elements, that looks like this `[0, function bound dispatchAction()]`. The first element is the default state value, in this case 0. The second element, is a function to set new state values.

 `const [count, setCount] = useState(0);` uses array destructuring to save the two array elements in separate constants. We use whatever naming convention we want here, however, the React community uses: `[<name>, <setName>]`.

:::tip
Within `handleClick()`, you can see that we use `setCount()` to increment our counter. **Notice how we do not directly modify count! This is rule number 1 - you must always use the associated sated setter - in this case `setCount()`**
:::

You'll see that we don't need to worry about binding the new counter value to the DOM - React does this for us.


:::tip Task
## Task 1 - Expanding on our counter application

Type in and expand on the above example:

-  Add a button to decrease the counter.
-  You can create multiple bits of state - add a second counter
-  Finally, add a button that calculates the product (times the two counters together) of the two counters and saves it to a new state variable called `product`
:::



## Adding State to Our Application

To explore the ideas of state in a little more depth we are going to turn our attention to our goal tracking application.

::: Task

## Task 2 -  Adding State to our application

- Clone the latest version of the solution for our challenge tracking application `https://github.com/joeappleton18/contemp-web-app-solutions.git`. You should note, we are taking a mobile first approach. As such, the design may currently look a little odd on a full-size browser.

- Open `src/Components/Header.js` we have two components within this one file. The first is the parent component `Header`, notice how it has a child component `Menu`, which contains our menu.

- We need some state to manage if our menu is open or closed.

- First, we must consider where our state should live. On first thoughts, you may think that `Menu` should maintain its open and closed state. However, notice how the hamburger is in `Header` not `Menu`. As such, let's create an `open` state in `Header`. You'll generally find,"hoisting" state up the component tree is advantageous.

```JavaScript
const  Header = () => {
  const [open, setOpen] = useState(false);
  ...
```

- **Hint**, make sure you import the state hook at the top of the file:

```js
    import React, {useState} from "react";
```

- Next, we need to set up an event to `handleClick` the clicked hamburger. Within `function Header()` create the following event handler:


```JavaScript
  const handleClick = (e) => {
      setOpen(true);
  }
```

- We can now set up the click event:

```JavaScript
  <StyledBurgerMenu onClick={handleClick}>
  ...

```

- Finally, we can pass our state into `<StyledMenuWrapper />` as a prop. Can you see how this state is being processed in `<StyledMenuWrapper />` ?


```js
 <StyledMenuWrapper open={open}>
          <Menu  />
</StyledMenuWrapper>

```

:::

:::tip Task

## Task 5 - Completing the menu

You may have noticed that our menu does not close! For the final task consider the following:

- How would you add an X to the top right of the menu? When it is clicked it should communicate to the Header component and the state should be updated accordingly? [Remember, state flows down - this means you'll need to consider how you would communicate between child and parent components](https://www.pluralsight.com/guides/react-communicating-between-components)

:::


## Part Two React Routing

:::tip

### Essential Reading :closed_book:

[React Router](https://reacttraining.com/react-router/web/guides/quick-start)

[Structuring a Larger React Application](https://survivejs.com/react/advanced-techniques/structuring-react-projects/)

:::

:::tip Task
Optional advanced reading:

[React documentation on the use effect hook](https://reactjs.org/docs/hooks-effect.html)

[An in-depth guide to the use effect hook. A fantastic blog post by  Dan Abramov - a react core team member.s](https://overreacted.io/a-complete-guide-to-useeffect/)(optional)

:::

## Creating an application with multiple views

Let's reconsider our goal tracking application. Currently, we only have one view - the dash. As such, we have placed all of the related dash view in the main `/src/App.js` component. This works -  as long as we only have a single view. However, moving forward, we are going to need multiple views. We need to re-structure our application to facilitate this requirement.

Structuring an ever-evolving React application can be a complex undertaking. The complexity comes from the fact there is no right or wrong way to do things - React is very un-opinionated.

There are patterns you can use (see [Structuring a Larger React Application](https://survivejs.com/react/advanced-techniques/structuring-react-projects/)). However, ultimately, how to structure an application is down to the developer. Dan Abramov, React core developer and the creator of Redux, recommends, "move files around until it feels right". This is all well and good for experienced developers;  however, as beginners, I think we need more in the way of guidance. As such, I am going to suggest a structure that has worked well for me in the past.

### Application Structure

We need to create an application that can serve multiple views, e.g.:

- Dash  (this is the default and our current view)
- Join
- Login
- Profile

The above views can be represented in the following folder structure:

```terminal
|-src/
   |-Components
     |- CheckinComment.js
     |- DaysCompleted.js
     ...
   |-Views/
      |- Checkin.js
      |- Dash.js
      |- Join.js
      |- Profile.js
```
Using the above layout convention we compose components into larger views. I like this line of thinking as it represents the structure, from a user perspective, of our application.

Let's explore this idea further by restructuring our existing application.



:::tip  Task
## Task 6 - Restructuring our application

The goal of this task is to restructure our application to conform to the above structure. Complete the following steps:

Create the file `src/Views/Dash.js`

Boostrap it as a blank component. You can use the following code:

```js
import React from 'react'
import PropTypes from 'prop-types'

const  Dash = (props) => {
    return (
        <div>
            <h1> Join </h1>
        </div>
    )
}

export default Dash;
```

Next, consider how you could extract the Dash view elements out of `App.js` and into `Dash.js`.   Once done, `App.js` should look like this:

```js
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <GlobalStyles />
        <Dash />
      </ThemeProvider>
    </div>
  );
}
```

Since we are going to be using a router to serve up different views, it would be handy to have more than just a single view. With this in mind, set up the below View components, that simply render an `<h1> </h1>`  containing the name of the component e.g. `<h1> Join </h1>`

```js
  - Views/Checkin.js
  - Views/Join.js
  - Views/Login.js
  - Views/Profile.js
```
::::

## Configuring Routing

Now we have a workable application structure, we can consider how we can conditionally serve up different views based on a given URL - or even application state.  The concept of routing provides us with the functionality that we are looking for. However, React does not come with a router; as such, we need to install one.

While there are several Routing possibilities, the [React Router](https://reacttraining.com/react-router/web/guides/quick-start), provided by React Training, is by far the most popular Let's install and configure it:

:::tip  Task
## Task 7 - Installing and configuring the react-router

The react-router is simple to install and configure:

- run `npm install react-router-dom`
- next, we need to wrap our entire application in the `<Router>` component.
- Open `src/index.js` and wrap your `<App>` in the `<Router>` component. Your code should then resemble the following:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css/reset.css'
import {
    BrowserRouter as Router
  } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```


### Adding Routes

We can now start adding routes. Open `src/App.js` and import the following dependencies:


```JavaScript
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";
```


- Also, import all of your views into your App component.

```JavaScript
import Dash from "./Views/Dash";
import Checkin from "./Views/Checkin";
import Join from "./Views/Join";
import Profile from "./Views/Profile";
```

- We can now add routes as follows:

```js
...
return (
      <div>
        <ThemeProvider theme={theme}>
          <Header  />
          <GlobalStyles />
            <Switch>
              <Route exact path="/">
                <Dash checkins={checkins} />
              </Route>
              <Route path="/join">
                <Join />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/checkin">
                <Checkin />
              </Route>
            </Switch>
        </ThemeProvider>
      </div>
  );
```
That's it - navigate to http://localhost:3000/join to test out your solution.

 In the above example, the `<Switch />` component allows us to declaratively specify routing logic. We do this by using the `<Route>` child component. Notice how it has the prop `path`  e.g.  `<Route path="/join">`  the router will **best match** the browser URL against this path.  If we want, we can override the best match functionality by using the prop `exact` - e.g. we've done this for the route path `/`.

 ### Home Study Tasks

 ## Task 8 - Setting Up Links

 Can you work out how to set up Routing Links? Use this knowledge to make the links in the menu work

 There will be occasions when you want to make logical decisions based on a routing event or state. [react-router has several hooks](https://reacttraining.com/react-router/web/api/Hooks) that allow us to access the internal functionality of the router.  For the next task, let's see how we could use a hook to enhance our menu.

## Task 9 - Using the react-router hooks

Consider the menu component in `src/Components/Header.js` each menu item is constructed using the following styled component `<StyledLi active={true}>  <Link to="/"> Dash </Link> </StyledLi>`.  Currently, the active link style is conditional based on the prop `active`. At the moment, to demonstrate this functionality, the dash link is simply set to active - at all times. However, we want active to be conditional based on the current route.

React-router provides a `useLocation` hook that can allow us to achieve the above functionality. Let's use it:

- Add useLocation to the `react-router-do-dom` import list: `import {Link, useLocation} from "react-router-dom";`
- We can now invoke the hook by calling `useLocation` at the top of our menu component like this:
```js
function Menu(props) {
  const { onClick } = props;
  const location = useLocation();
......
```
- The current location is now available to us in `location.pathname`
- Can you use location to highlight the active link?
- Work out how to use the `useLocation` hook to hide the `<Header />` on the login/sign up page
::: -->
