# Forms,Validation and Conditional Rendering

:::warning session dependencies

## Session Dependencies

[Make sure that you have the latest of the ongoing class, fitness tracker, project. **The notes for this week refer extensively to this project**](`git clone -b week-6-solutions https://github.com/joeappleton18/running-contemp-web-app-solutions.git`).

This week concludes our React learning! In the following week we are going to be moving on to looking at validation and data persistence using Firebase.

Our weekly learning focus will involve answering the following question:

**How can I gather and validate user data through accessible forms?**

We can further break this question down into the following concerns:

- How can I provide dynamic user feedback with regards to the validity of our form data?
- What programming patterns can I use to integrate form into my React applications?
:::
:::warning reading

### Essential Reading :closed_book:

- [Conditional Rendering In React](https://reactjs.org/docs/conditional-rendering.html)

- [React Hook Form basic overview](https://react-hook-form.com/get-started/)

- [Familiarise yourself with the yup documentation](https://github.com/jquense/yup)

:::

:::warning

Optional advanced reading:

[JavaScript Logical Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)

:::

## Conditional Rendering

Often you will want to hide or show elements based on some given state (e.g. displaying errors on a form). In other words, you will want to **conditionally** render some part of the UI.

"Conditional rendering in React works the same way conditions work in JavaScript" - as such, there is a very shallow learning curve.

JavaScript facilitates multiple approaches to conditions. The method you use is very much down to your preference as a developer or your given project's style guide. Let's explore some of the most common methods:

### If/Else

I very rarely use if/else on the UI - it is just too verbose. However, on the positive side, it is very easy to understand.

```JavaScript
{if (isLoggedIn) {
      <LogoutButton onClick={handleLogoutClick} />;
    } else {
  <LoginButton onClick ={handleLoginClick} />;
   }
}
```

### The Turnery Operator

If I need to conditionally render 1 of 2 very small sections of UI I will normally use this approach.

```JavaScript
  { isLoggedIn ?   <LogoutButton onClick={handleLogoutClick} /> : <LoginButton onClick ={handleLoginClick} /> }
```

You can think of a turnery operator as a short-hand if/else.

**If**, `isLoggedIn` is true, the expression immediately after the `?` is executed. **Else**, if `isLoggedIn` is false, the expression after the `:` will instead run.

### The logical && operator (my go to solution)

Javascript has an interesting property summarised by Mozilla "the && and || operators actually return the value of one of the specified operands, so if these operators are used with non-Boolean values, they will return a non-Boolean value.". The important statement in the previous quote is, "return the value of one of the specified operands", we can use this idea to construct render conditions.

```JavaScript
{
    isLoggedIn && (<LogoutButton onClick={handleLogoutClick}/>);
}

{
    !isLoggedIn && (<LogoutButton onClick={handleLogoutClick}/>);
}

```

In the above example, for each && condition, either false will be returned if the first part of the condition is false. Or, if the first part of the condition is true, then the value on the right of the && is returned, which is, in this case, a React component. I really like this approach as, very much like the `if/else` example, it is very easy to rationalise about and states how we want to update the UI in a declarative way. Moreover, it lends itself to displaying larger blocks of UI:

```JavaScript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
         <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
        <p>
            You should go to your inbox ASAP - the message could be from Joe!
        </p>
      )}

       {unreadMessages.length == 0 && (
          <h2>
           Nice work, you have no messages
        </h2>
       )}
    </div>
  );
}
```

:::tip

## Task 1 - Conditional Rendering

Navigate to `http://localhost:<your port>/join` - it is incomplete. As such I want you to implement the following logic - which I shall express using user stories:

- As a user, the join form should be hidden from me by default, so I am encouraged to join using social sign in.

- As a user, I should be able to display the join form by clicking the Email button, so I can join using an email.

- As a user, the Email button should be hidden after I click it, as it is no longer needed.

Use what you have just learnt about conditional rendering and also what we covered with regards to [event handling](/) to implement the above user stories.

:::

## Forms

Conceptually, I treat forms as the maintainers of valid user data. In strict accordance with the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle), all they do is ensure that the data is valid and, when the user submits the form, pass this valid data to some other component. Using this approach, you can think of a form as:

> > A black box that takes in user input, validates it and outputs this valid data for processing.

## Validating and handling form data

I like to use a library to handle form validation and processing concerns. There are several to choose from, historically, the most popular being:

- [Formik](https://github.com/jaredpalmer/formik)
- [Redux Form](https://redux-form.com/8.3.0/)

However, recently, [React Hook Form (RHF)](https://react-hook-form.com/) has been released and is gaining a lot of traction. Compared to the former examples, I find this solution very elegant. This elegance is achieved through its heavy reliance, on the relatively new feature of react hooks. Therefore, given that we are writing modern react, it is an excellent candidate for our use.

### Validating and handling form data with RHF

Let's consider an example:

```JavaScript
import React, { useState } from "react";
import { useForm } from 'react-hook-form'

import React from "react";
import { useForm } from "react-hook-form";

function MailingList(props) {
  const {register,formState: { errors },handleSubmit,} = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Join My Mailing List</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} />
        <p>{errors.name?.type === "required" && "First name is required"}</p>
        <input {...register("email", { required: true })} />
        <p>{errors.email?.type === "required" && "Email is Required"}</p>
        <input type="submit" />
      </form>
    </div>
  );
}


```

Let's unpack the above example.

- We import the `useForm` hook, `import { useForm } from 'react-hook-form'`. `useForm`, in reality, is nothing more than a function.

- Within the body of our MailingList component, we call `useForm()`. useForm returns an object with a number of utility functions and values that we can use. Notice how we use object destructuring to accesses individual properties of the object that `useForm()` returns. The complete line of code looks like this: `const {register,formState: { errors },handleSubmit,} = useForm();` - we can now use these constants to validate our form.

- Note how we can pass validation rules into register. On submit, should the validation fail, an error message for each invalid field will be assigned to an errors constant - also provided by RHF.

- Notice how we use the onSubmit provided by RHF - `handleSubmit(onSubmit)` - this will only run when the form is valid.

:::tip

## Task 2 - Validate the Join Form

- Install RHF, `npm install react-hook-form` ([RHF form validation](https://react-hook-form.com/get-started#Applyvalidation))
- Add validation to `components/LoginForm.js` - currently being used in `src/Views/Join.js`
- Display an error label below each invalid input. You should style this error appropriately (e.g. red).
- You should ensure that the password is some minimum length and the email is valid. Both password and email are, of course, required.
- **Note,** that our form inputs are nested in a styled component - `StyledInputArea`. It turns out that RHF acts a little odd if it's operating inside a styled component. To fix this issue, remove StyledInput area, and add the following to `config/globalStyles.js`:

```JavaScript
input[type="text"], input[type="email"], input[type="password"] {
    width: 100%;
    height: 44px;
    border: 1px solid ${({ theme }) => theme.colors.darkShade[10]};
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 2%;
    font-size: 22px;
}
textarea {
    border: 1px solid ${({ theme }) => theme.colors.darkShade[10]};
    border-radius: 4px;
}
label {
    font-size: 12px;
    font-weight: bold;
    line-height: 15px;
    text-transform: uppercase;
    margin-bottom: 20
    color: #1F2041;
}
`
```

:::

Using the above, there is now no need to use a styled components for our form.

## Better Form Validation Validation

[While RHF has built in validation functionalities](https://react-hook-form.com/get-started#Applyvalidation), as our forms grow in complexity, we may want a slightly more sophisticated way to construct validation rules. This is where a data schema that represents our form data can be useful. We will use a tool called [yup](https://github.com/jquense/yup) to build our schema.

### yup

Yup is a JavaScript schema builder for value parsing and validation. Let's consider how we might use it with RHF.

- First we need to install a few extra dependencies:

- yup, `npm install yup`
- the RHF yup resolver, `npm install @hookform/resolvers yup`

```JavaScript

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
function MailingList(props) {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("email is not valid")
      .required("you must enter a email"),
    name: yup
      .string()
      .required("name is required")
      .min(2, "name must be a a longer than two letters"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Join My Mailing List</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <p> {errors.name && errors.name?.message} </p>
        <input {...register("email")} />
        <p>{errors.email && errors.email?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
}

export default MailingList;

```

In the above example we use yup, not only to define our schema, but also to construct custom error messages that are displayed based on the type of validation error - pretty nice! All we need to do is pass the validation schema into `useForm()`. [Yup offers dozens of different validation rules that we can use](https://github.com/jquense/yup)

:::tip

## Task 3 - Schema Validation

- Install yup - `npm install yup`
- Install the resolver - `npm install @hookform/resolvers`
- Add a validation schema and custom messages to `components/LoginForm.js` - currently being used in `src/Views/Join.js`

:::

# Further Study

:::tip

## Task 4 - Create the login view

- Can you adapt/use the `/src/Components/LoginForm.js` to create a login view.

:::

:::tip

## Task 5 - Refactor and Complete the Checkin Form

Complete this task if you want a challenge, it really pulls together everything we've learnt so far.

- Currently the form itself is is nested within a view - `src/Views/Checkin.js`. However, it is not in accordance to the principle that a form should be "A black box that takes in user input, validates it and outputs this valid data for processing.". To achieve this, extract the checkin form to its own component and add validation.

- Complete the remaining Checkin form functionality. I shall express this functionality as user stories:

- As a user, I should be, optionally, displayed the food and drink inputs if I select no for "WAS YOUR DIET PERFECT?", so I can deduct points

- As a user, I should see the char count tick downwards as I write my comment, so I know how many chars I have left

- As a user, I should see my score go up or down based on what I select, so I know my points before I checkin.

- **Note**: the number of points available (max 20) is appended to each label. Often they are binary, e.g. drinking water is 3 or 0. However, diet, worth 10 points, is a sliding scale. Users will deduct a point, up to a maximum of 10 based on their infringements. Consider how you would use `useEffect` or, perhaps easier, [react-hook-form-watch](https://react-hook-form.com/api#watch) to achieve this task

:::
