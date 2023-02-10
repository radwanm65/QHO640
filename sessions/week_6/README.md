# Routing

:::warning session dependencies

## Session Dependencies

[Make sure that you have the latest of the ongoing class, fitness tracker, project. **The notes for this week refer extensively to this project**](`git clone -b week-4-solutions https://github.com/joeappleton18/running-contemp-web-app-solutions.git`).

:::

:::warning reading

### Essential Reading :closed_book:

[React Router](https://reacttraining.com/react-router/web/guides/quick-start)

[Structuring a Larger React Application](https://survivejs.com/react/advanced-techniques/structuring-react-projects/)

[React documentation on the use effect hook](https://reactjs.org/docs/hooks-effect.html)

:::

:::warning optional reading

Optional advanced reading:

[An in-depth guide to the use effect hook. A fantastic blog post by Dan Abramov - a react core team member.](https://overreacted.io/a-complete-guide-to-useeffect/)(optional)

:::

This week is going to be particularly interesting You are going to be learning how to implement routing into your application. This will allow us to create the effect of having multiple pages in our single page application.

## Creating an application with multiple views

Let's reconsider our goal tracking application. Currently, we only have one view - the dash. As such, we have placed all of the related dash components in the main `/src/App.js` component. This works - as long as we only have a single view. However, moving forward, we are going to need multiple views. We need to re-structure our application to facilitate this requirement.

Structuring an ever-evolving React application can be a complex undertaking. The complexity comes from the fact there is no right or wrong way to do things - React is very unopinionated.

There are patterns you can use (see [Structuring a Larger React Application](https://survivejs.com/react/advanced-techniques/structuring-react-projects/)). However, ultimately, how to structure an application is down to the developer. Dan Abramov, React core developer and the creator of Redux, recommends, "move files around until it feels right". This is all well and good for experienced developers; however, as beginners, I think we need more in the way of guidance. As such, I am going to suggest a structure that has worked well for me in the past.

### Application Structure

We need to create an application that can serve multiple views, e.g.:

- Dash (this is the default and our current view)
- Join
- Login
- Profile

The above views can be represented in the following file structure:

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

:::tip task 1

## Task 1 - Restructuring our application

The goal of this task is to restructure our application to conform to the above structure. Complete the following steps:

Create the file `src/Views/Dash.js`

Bootstrap it as a blank component. You can use the following code:

```js
import React from "react";

const Dash = (props) => {
  return (
    <div>
      <h1> Dash </h1>
    </div>
  );
};

export default Dash;
```

Next, consider how you could extract the Dash view elements out of `App.js` and into `Dash.js`. Once done, `App.js` should look like this:

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

**hint:** you will need to pass the mocked `checkins` array into the new `Dash` component as a `Prop`.

Since we are going to be using a router to serve up different views, it would be handy to have more than just a single view. With this in mind, set up the below View components, that simply render an `<h1> </h1>` containing the name of the component e.g.

```js
- Views /
    - Checkin.js 
    - Join.js 
    - Login.js 
    - Profile.js;
```
::::

## Configuring Routing

Now we have a workable application structure, we can consider how we can conditionally serve up different views based on a given URL - or even application state. The concept of routing provides us with the functionality that we are looking for. However, React does not come with a router; as such, we need to install one.

While there are several Routing possibilities, the [React Router](https://reacttraining.com/react-router/web/guides/quick-start), provided by React Training, is by far the most popular Let's install and configure it:

:::tip

## Task 2 - Installing and configuring the react-router

The react-router is simple to install and configure:

- run `npm install react-router-dom@5` 
- next, we need to wrap our entire application in the `<Router>` component.
- open `src/index.js` and wrap your `<App>` in the `<Router>` component. Your code should then resemble the following:

```js
import React from "react";
import ReactDOM from "react-dom";
import "reset-css/reset.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

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

In the above example, the `<Switch />` component allows us to declaratively specify routing logic. We do this by using the `<Route>` child component. Notice how it has the prop `path` e.g. `<Route path="/join">` the router will **best match** the browser URL against this path. If we want, we can override the best match functionality by using the prop `exact` - e.g. we've done this for the route path `/`.

:::

## Further Routing

### Dealing With Links

Consider our menu that currently lives in `src/Components/Header.js`. Notice how our menu links are not operational. React-router provides us with a `<Link>` component, which can be used in replacement of traditional `<a>` tags. Let's set up some links:

:::tip

## Task 3 - Setting Up Links

- Within `src/Components/Header.js` import `react-router`'s `<Link>` component:

```js
import { Link } from "react-router-dom";
```

- We can now set up our links as follows:

```js
<Link to="/"> Dash </Link>
```

- Complete this task by setting up a link for profile
  :::

## Logic base on the route

There will be occasions when you want to make logical decisions based on a routing event or state. [react-router has several hooks](https://reacttraining.com/react-router/web/api/Hooks) that allow us to access the internal functionality of the router. For the next task, let's see how we could use a hook to enhance our menu.

## Task 4 - Using the react-router hooks

Consider the menu component in `src/Components/Header.js` each menu item is constructed using the following styled component `<StyledLi active={true}> <Link to="/"> Dash </Link> </StyledLi>`. Currently, the active link style is conditional based on the prop `active`. At the moment, to demonstrate this functionality, the dash link is simply set to active - at all times. However, we want active to be conditional based on the current route.

React-router provides a `useLocation` hook that can allow us to achieve the above functionality. Let's use it:

- Add useLocation to the `react-router-do-dom` import list: `import {Link, useLocation} from "react-router-dom";`
- We can now invoke the hook by calling `useLocation` at the top of our menu component like this:

```js
function Menu(props) {
  const { onClick } = props;
  const location = useLocation();
......
```

- The current location is now avalible to us in `location.pathname`
- Can you use location to highlight the active link? Do this to complete the task
  :::

## Further React Hooks

Currently, when we change location the menu remains open. From a usability perspective, this is not ideal - since the user has completed their required action we should close the menu. To achieve this functionality we need to be able to listen to the location and act when it changes. The `useEffect` react hook allows us to do this.

Remember, ["Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class."](https://reactjs.org/docs/hooks-effect.html).

We can use the `useEffect` hook to run an effect whenever the state of our component changes. For now, you can just use this hook in a rote learning fashion. However, hooks, specifically the useEffect, are very powerful and I recommend conducting research in your own time ([read](https://overreacted.io/a-complete-guide-to-useeffect/), [read](https://reactjs.org/docs/hooks-effect.html)).

Below is an example of a useEffect hook:

```js
import React, { useState, useEffect } from "react";

function someComponent() {

const [count, setCount] = setState(0);

useEffect(() => {
 console.log ("You clicked ${count} times")
}, [count]);

return (/*...*/)
}
```

As I said, we, unfortunately, do not have the time to explore effect hooks in-depth. However, we can briefly touch on the above example.

`UseEffect` is a function that takes in, as an argument, a function and an optional array. The function is the effect and will be run every time the component state updates. The second optional argument - the array - limits the effect to run only on specific state updates. **As such, in the above example, the effect will only run when the count state updates**.

:::tip

## Task 5 - Using UseEffect

Can you use the useEffect hook within your menu component to watch the `location` variable? When the location changes you should close the menu?
:::

## Home Study

:::tip

## Task 7 - Create a 404 page

Can you work out how to set up a 404 page if a route does not exist?
:::

:::tip

## Task 8 - Conditional Rendering

Work out how to use the `useLocation` hook to hide the `<Header />` on the login/sign up page
:::

:::tip

## Task 9

Can you hoist the menu state up to app? If you do this you should be able to add the functionality to close the menu if a user clicks away from it on the main part of the application.

:::
