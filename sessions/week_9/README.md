# Week 9 - Managing Data Using Firebase

This week, we continue our journey into the the wonderful world of serverless. We will be considering how we can use the firebase document database, [firestore](https://firebase.google.com/docs/firestore).

In doing so, we will be answering the following question?

### How can I persist data in my web applications?

:::warning session dependencies

## Session Dependencies

Make sure that you have the latest of the ongoing class, fitness tracker, project. The notes for this week refer extensively to this project:

`git clone -b week-8-solutions https://github.com/joeappleton18/running-contemp-web-app-solutions.git`

Moving forward, due to having to integrate with firebase, setups are a little more involved. You will need to ensure that you add your own firebase credentials. The `README.md` file on my version of the fitness tracker walks you through how to do this.

:::

### Essential Reading :closed_book:

:::warning essential reading

- [The cloud firestore overview](https://firebase.google.com/docs/firestore)
- [The cloud firestore data model](https://firebase.google.com/docs/firestore/data-model)

:::

## Introduction

This week, we are going to be exploring cloud Firestore, the database offering by Firebase. Out of the box, we get a powerful, scalable database.

:::warning tip
Do not confuse Firestore with the Realtime Database. The Realtime database is a older, more simplistic, database product. For new projects you should be using Firestore.
:::

## A little bit about the Firestore database

Cloud Firestore is a NoSQL, document-oriented database. There are three main types of NoSQL-databases: document-based, column-based and graph-base. Cloud Firestore is of the document-based variety.

In a document-based database, your application's data is stored in documents in a JSON like structure. Documents live in collections. If you come from a relational database world, collections are like tables. If your application requires it, you can also structure sub-collections within documents. We will explore how this works through examples. As this is not a database unit, I am not overly focusing on data modeling.

One of the fundamental rules of non-relational data modeling is we try and represent data from a user-first perspective. In other words, we want to structure our data so it can be simply displayed in our application's users interface.

## Setting up the Firestore Database

![](./assets/fig_1.png)

> > Figure 1, creating a database

Creating a database for your project is simple:

- In your firebase project, select Database from the left-hand-side, develop menu section

- Next, click the `create database`

- We want to start off in test mode, so select this option when prompted

:::tip

## Task 1 - Setting up a database

Follow the steps above to set up your database - ensure that you set it up in "test" mode.

:::

## Structuring Data

Remember, the data in our database is created from the perspective of a user. To highlight this point let's consider, first, our check-in functionality and data that it outputs.

:::tip

## Task 2 - Exploring the check-in data

- Log-in to your application
- Navigate to the `/checkin`.
- Next, within `Views/Checkin.js` work out how to set up a `handleSubmit` function that logs to the console the checkin.

<HiddenSection display-text="click me for a hint">

- Add a `onSubmit()` event handler to the CheckInForm component: `<CheckinForm onSubmit={handleSubmit}/>`

- Set up an event handler function within your Checkin function:

```JavaScript
...
 const Checkin = props => {
    const handleSubmit = checkin => {
        console.log(checkin);
    }
...
```

</HiddenSection>
:::

On completing the above task you will have seen that our check-in data looks like this:

```JavaScript
 {
        exercise: 5
        veg: 3
        water: 2
        diet: 7
        comment: "test"
        total: 20
        drinkPen: "1"
        foodPen: "2"
    }

```

The above data structure is close to resembling a document that could be stored in our database. However, look at our application's main dash, and you can see that we do not have enough information to display a check-in. For now, I am most concerned that we are missing a userName, userId and photo. This information needs to be added to our check-in object.

:::warning
You may think, why not just add a userId to our check-in and we could look the rest up. Remember, though, we are optimising for quick reads and data structures that resemble our UI. Yes, we are duplicating data; however, this idea, know as denormalisation, is fine in the NoSQL world.

:::

With the above in mind we want to create the following data structure:

```JavaScript

    {
        exercise: 5
        veg: 3
        water: 2
        diet: 7
        comment: "test"
        total: 20
        drinkPen: "1"
        foodPen: "2"
        // additional fields
        photo: "joephotourl"
        userName: "joe appleton"
        userId: "vDyPgsU41CMrFK29bmN4lULK6JN2",
        time: "Wed Mar 18 2020 10:03:31 GMT+0000 (Greenwich Mean Time)"
    }

```

:::tip

## Task 3 - Denormalisation of the checkin data

- Can you structure our current checkin object so it resembles our data structure above
- First, we need to grab the currently logged in user. We can do this by getting the `user` from our `useAuth` hook.

```JavaScript
import useAuth from "../services/firebase/useAuth";
...
const Checkin = (props) => {
  const { user } = useAuth();
  ...
}
```

- You now have access to the user details
- There is a slight gotcha, if someone has signed up using email they may not have a userName in which case we want to use their email instead (users always have an email). In JavaScript, you can use the following technique to assign a default value:

  `const userName = user.displayName || user.email`;

<HiddenSection display-text="hint">

```JavaScript
    const handleSubmit =  async checkin => {

        const ckin = {...checkin,
                      ...{photo: user.photoURL,
                          userId: user.uid,
                          userName: user.displayName || user.email,
                          time: new Date()}}
    }

```

</HiddenSection>
:::

- [Above, I am using the ES6 spread operator to combine the `checkin` object with a second, custom created, object. The second object contains the additional user details that we want to store alongside our checkin]

## Reading and Writing to Our Database

## Writing Data to Firestore

To use the firestore database in our application, we first need to import it.

- Remember, we are following a design pattern where we use hooks to communicate with third-party services.

- With the above in mind, create a `src/services/firebase/useCheckin.js` file and add the following code:

```JavaScript
import { useState} from "react";

import {
  doc,
  addDoc,
  collection,
  getDocs,
 getFirestore
} from "firebase/firestore";

function useCheckin() {
  const db = getFirestore();
  const ref = collection(db, "checkins");
  const createCheckin = (checkin) => addDoc(ref, checkin);
  const getCheckins = () => getDocs(ref);

  return {getCheckins, createCheckin}
}

export default useCheckin;

```

Let's unpack what we are doing above:

- `const db = getFirestore();` gets a reference to our firestore database.

- `const ref = collection(db, "checkins");` is a pointer to a checkins collection in our database. If the collection does not exist it will be created when the first document is written to the collection
- We then use the above ref set up functions to add a new checkin `const createCheckin = (checkin) => addDoc(ref, checkin);` and also to read our all of the checkin documents from our collection `getCheckins = () => getDocs(ref);`
- Finally, we return our functions so they can be used in other components: `return {getCheckins, createCheckin}`

:::tip task

## Task 4 - Make your first database write

This task requires us to create our first database write. We are going to be making a checkin. We are going to be working with `src/Views/Checkin.js` to enable this functionality.

- Import the checkin hook: `import useCheckin from "../services/firebase/useCheckin";`
- Within your component invoke the hook and pull out the `createCheckin` function:

```JavaScript
    const Checkin = (props) => {
      ...
       const { createCheckin } = useCheckin();
      ...
  }
```

- Now we can write a checkin to our database by simply passing the checkin object constructed on our `onSubmit` event into `createCheckin` hook function:

```JavaScript
import { useHistory } from "react-router-dom";
....
const Checkin = (props) => {
  const history = useHistory();

.....
 const handleSubmit = async (checkin) => {
    const ckin = {
      ...checkin,
      ...{

        photo: user.photoURL,
        userId: user.uid,
        userName: user.displayName || user.email,
        time: new Date(),
      },
    };

    try {
      await createCheckin(ckin);
       history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

```

- If the above worked, you should be redirected to the the dash `"/"` and have data in your database!
  :::

## Reading Checkin Data

- Let's see if we can now read our checkins, we will do this in our top level `/Views/Dash.js`. I think this makes more sense over hosting the state up to our `src/App.js` component.

- First, we need to grab `getCheckins` from our `useCheckinHook`.
- Within `/Views/Dash.js` add `import useCheckin from "./services/firebase/useCheckin";` to the top of your component.
- Then is your dash component pull out `getCheckins`, and set up some state to hold the checkins:

```JavaScript
function Dash() {
  ...
  const { getCheckins } = useCheckin();
  const [checkins, setCheckins] = useState([]);
  ..
}

```

- We now need to consider when to call `getCheckins`. We want to do this when the component has rendered. The best way to do this is through using the `useEffect` hook.

```JavaScript
import React, { useEffect, useState } from "react";
...
function Dash(props) {

  ...
   const getCheckinData = async () => {
    const checkinsSnap = await getCheckins();
    let checkins = [];
    if (checkinsSnap.size) {
      checkinsSnap.forEach((doc) => {
        checkins.push({ ...doc.data(), ...{ id: doc.id } });
      });
      setCheckins(checkins.reverse());
    }
  };

  useEffect(() => {
    getCheckinData();
  }, []);

  ...
```

- Notice how I call the async function `getCheckinData`, this allows me to avoid making the `useEffect` function async. If I were to make my `useEffect` function `async` it would be placed on the event loop, and delay my function from rendering.

- A futher point of note, is I am reversing the checkins `checkins.reverse()` . This is so the latest checkin is show at the top of the dash. It is common, when using `Firebase` to make app level manipulations to data.

## Home Study

:::tip home study

## Task 5 - Display the checkin data

- Can you update the dash so it displays checkins from our database
- At the moment you will still need to use placeholder data for the histogram in the checkins, we'll solve this issue next week.

## Task 7 (Advanced)

- Can you work out how to implement the comment functionality?

- This is a really interesting challenge. [You should consider using Firebase's realtime data update functionality[(https://firebase.google.com/docs/firestore/query-data/listen)].

:::

## Solution Video 

<iframe src="https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b5259fc0-7fce-4bd8-8d7c-adea0082f06b&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&captions=true&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>