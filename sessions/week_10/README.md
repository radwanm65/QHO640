# Week 10 - Hosting, Rules and Cloud Functions

Welcome to week 10, our final week of formal delivery. This week we are going to consider the following:

- How can I host my application?
- How can I secure my database?

:::warning session dependencies=

## Session Dependencies

[Make sure that you have the latest of the ongoing class, fitness tracker, project. \*\*The notes for this week refer extensively to this project:

`git clone -b week-9-solutions https://github.com/joeappleton18/running-contemp-web-app-solutions.git`

This week's, and future, setups are a little more involved. You will need to ensure that you add your own firebase credentials. The `README.md` file on my version of the fitness tracker walks you through how to do this.
:::

### Essential Reading :closed_book:

:::warning essential reading
The firebase documentation on:

- [Hosting](https://firebase.google.com/docs/hosting)
- [security rules](https://firebase.google.com/docs/rules)
  :::

## Introduction

This week we are going to push things to the next level and make our application production-ready by securing our database. You will also learn how to deploy your application to hosting. To achieve all of this we will need to install the firebase command line interface.This is as far as we are going to take things! I appreciate our application is not finished. However, it's served its purpose in teaching you the basics of React and Firebase!

## Getting started with the Firebase Command Line Interface (CLI)

According to the documentation, "The Firebase CLI provides a variety of tools for managing, viewing, and deploying to Firebase projects". I have found it to be a powerful tool.

The Firebase CLI is simple to install:

- First, ensure that you have Node.js v8.0.0 or later installed (this should be the case)
- Next, from within a terminal or shell run `npm install -g firebase-tools`. The `-g` option globally installs `npm` packages.

:::warning
 - If you are working on the university computers, you can't do global installs `npm install -g firebase-tools`. 

- Instead, you will need to install the firebase cli locally: `npm install -D firebase-tools` 

- Next, wherever I say run the `firebase` command pre-append `npx` (e.g., `firebase login` becomes `npx firebase login`)
:::

:::tip


::tip

## Task 1 - Getting Started with the CLI and Deploying to Hosting
![](./settings.png)
0.  To use the latest version of the CLI, you'll need to set the `Default GCP resource location` from your project's settings in the firebase dashboard.
1. Use the steps above to install the CLI
2. Within the terminal authenticate the CLI by running `firebase login`
3. Next, within the terminal, navigate to the root of your goal tracking application and run `firebase init`.

The video below that walks you through setting up the CLI products that we need, press space to select things. When prompted, you will need to make sure that you select the firebase project that contains your goal tracking application.

<iframe src="https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d38c636e-ff2c-4ac0-ae7b-ab8700c9e84b&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" width=720 height=405 style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>

4. We are now ready to deploy our application to the firebase hosting:

- First, create a production build of your project, `npm run build`
  After this command has run you should see a 'build' folder containing your production-ready application.

- Next, deploy the project to firebase hosting, you simply need to run the command `firebase deploy --only hosting`

- That's it! If all has worked, your application should have been deployed to its own custom URL. You may want to add the hosting deployment command, and further commands you use, to your scripts object in your `package.json` file.



## Securing your Firebase Database

Currently our database is not locked down and users can perform any operation they like. To solve this problem, we can use firebase security rules to secure our database.

Firebase rules are written in a simple language called Common Expression Language (CEL). Luckily, CEL is similar to JavaScript, albeit somewhat more limiting.

Your projects rules are stored in the `firestore.rules` file. Currently, your application is not locked down. Replace the existing rules with the following code snippet:

```JavaScript

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /{document=**} {
          allow read, write: if request.auth.uid != null;
    }
  }
}

```

The above code is an example ensures that only logged in users can read/write to our database. Let's explore what is going on above:

- First, we use the wild card to match all documents `{document=**}`.

- We then list the operations that we want to allow - `allow read, write`. You should note that write captures - create, update and delete.

- Finally, we set a condition, `if request.auth.uid != null;`, should this condition resolve to true the operation is allowed.

- `request` is a global var that firebase makes available to us. If `request.auth.uid != null;` is set then the user is logged-in.

- We can deploy our new updated rules by running: `firebase deploy --only firestore:rules`.
::: 
:::tip

## Task 2

- Using the steps above secure your database so only logged in users can read and write to your database
- From within the database section in your firebase project, click on the rules tab - these rules should mirror your local version
- See if you can figure out how to test if your rules work. You can use the "rules playground" to see if this the case
  :::

## Increasing the granularity of our rules

Currently, our application is wide-open to any logged-in user. This is only slightly better than having no authentication at all. Luckily, firebase allows us to protect each collection and sub-collection on a granular level - it even affords us the ability to evaluate the incoming data and, for complex rules, access other documents. Let's explore some of these ideas to make our database more secure:

```JavaScript

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /checkins/{checkin} {
      allow read: if request.auth.uid != null;
      allow write : if request.resource.data.userId == request.auth.uid   // users can only check themselves in
    }

  }
```

- In the above example, we lock down down documents on a collection-by-collection basis. Notice how we can access the incoming data, `request.resource.data.userId == request.auth.uid`. This ensures that a user can only check themselves in. However, any logged-in user can read the data.

- Finally, the only other collection we need to consider is comments. Comments are interesting as they are a sub-collection of a checkin document. To begin with let's make all documents within a comments collection insecure. Notice how we nest the rule for a sub-collection within its parent collection:

```JavaScript
    ...
    match /checkins/{checkin} {
      allow read: if request.auth.uid != null;
      allow write : if request.resource.data.userId == request.auth.uid;;  // users can only create a checkin for themselves

      match /comments/{comment} {
        allow read, write: if true;
      }
      ...
    }
```

Let's now consider how we can secure our comments sub collection - we have two choices here. However, first, let's understand what we are looking to achieve with our security rules.

- Just like with our checkin documents, we only want users to be able to create comments under their own user id
- Any logged-in user can view comments

Our first solution would be to simply duplicate the logic that we have already used for the parent checkin collection:

```JavaScript
    ...
    match /checkins/{checkin} {
      allow read: if request.auth.uid != null;
      allow write : if request.resource.data.userId == request.auth.uid;  // users can only create a checkin for themselves

      match /comments/{comment} {
        allow read: if request.auth.uid != null;
        allow write : if request.resource.data.userId == request.auth.uid;
      }
      ...
    }
```

The above solution is fine; however, since the sub-collection shares the same rules as its parent, another solution would be to create a wildcard that cascades the parent rules downwards:

```JavaScript
    ...
    match /checkins/{document=**} {
      allow read: if request.auth.uid != null;
      allow write : if request.resource.data.userId == request.auth.uid;  // users a can only create a checkin and a comment for themselves
      ...
    }
```

In this instance, I prefer the latter approach. However, since each further sub-collection will inherit the parent security rules, we must use it with caution.

:::tip

## Task 3

Use the techniques coved above to secure your database.

:::

<!--
## Cloud Functions (Optional)

Currently, our entire code base runs within our users' browser and most of the time this works well for us. However, there will be occasions where you need to perform tasks that are either too costly or insecure to run in a web browser. Normally, we would run such tasks on our server, but Firebase is serverless and we don't have access to a server. This is where cloud functions can help, according to the documentation they, "let you automatically run backend code in response to events triggered by Firebase features and HTTPS requests.".

With regards to cloud functions, we will only scratch the surface. However, with cloud functions, you can:

-    Notify users when something interesting happens.
-   Perform database sanitization and maintenance.
-   Execute intensive tasks in the cloud instead of in your app.
-   Integrate with third-party services and APIs.

## Writing our first cloud functions

You will see that you have a `functions` folder in the root of your project. This should have been created when you initiated your firebase app. In effect, the functions folder is its own stand-alone node application - notice how it has its own `package.json` file. As such, it does not share any dependencies with, your web application.

Let's consider where cloud function could be utiliased in our current application:


- When a new user authenticates with our application, it would be useful to create a corresponding record for that user. Since we cannot add extra fields to the auth object, this approach provides us with added flexibility.

- When a user is deleted, their associated user document should also be deleted

- Notice how each checkin has a summary of the last 7 checkins in the form of a histogram. Since we might have hundreds or even thousands of checkins, it would become computationally expensive to query historic checkins on a checkin-by-checkin basis. We can use cloud functions to track and attach a checkin summary to each checkin.

Let's deal with the user authentication functionality first.  Within your `functions/index.js` file add the following lines of code:

   ```JavaScript

    const functions = require("firebase-functions");
    const admin = require("firebase-admin");
    admin.initializeApp();
    const db = admin.firestore();

    exports.userCreated = functions.auth.user().onCreate(user => {
    return db
        .collection("users")
        .doc(user.uid)
        .set({ checkins: [] });
    });

    exports.userDeleted = functions.auth.user().onDelete(user => {
    return db
        .collection("users")
        .doc(user.uid)
        .delete();
    });

   ```

You can deploy your cloud functions by running the following command: `firebase deploy --only functions`. Once the functions are deployed you can see their status in the functions section of your online project dashboard.  You should note, that you can provide developer feedback by using `console.log()` in your functions. You can view this logging information in your project dashboard.

Let's briefly consider what is going on in the above code snippet.

First, we import two dependencies into our project, the `firebase-functions` library and the `firebase-admin` SDK.

 ```JavaScript
 const functions = require("firebase-functions");
 const admin = require("firebase-admin");

 ```

Notice how we are using Node.js "require" to import modules, as opposed to "import as". This is because cloud functions are compiled using node.js as opposed to in the browser.

Next, we initiate the admin-sdk `admin.initializeApp();`.  Since this code runs in our server-side firebase deployment, we do not need to pass  in any credentials.

To complete our setup, we use the Firebase admin SDK to get a reference to our database `const db = admin.firestore();`.  We can use this reference very much the same way that we use our front-end firebase library.

Once we have initiated the dependencies, we can use the functions library to listen for certain events and the firebase SDK to make database manipulations.

:::tip
## Task 4

Use the information above to set up cloud function that are triggered around a user authenticating and a user being deleted.

:::



:::tip

## Task 5 Home Study

Can you add a cloud function that maintains a checkin summary array that is stored in each users associate document. Furthermore, this summary should be added to each user checkin. Once this is done, you can update the histograms in your application to use live data.

::: -->
