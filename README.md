# This is a full stack blog app for the assignment


## Tech Used are 
1) React for the frontend
2) Nodejs and Express for the backend 
3) Mongodb for the database 
4) React-Redux for state Managment 
5) React From Hook for form managment and validation of Forms
6) Zod for form validations both in frontend and backend
7) React query for data fetching 
8) Frontend User Interface (UI) used Tailwind css and ShadCn for Component Library
9) ODM Mongoose 



## Implemented Features

1) user can login and sign up and Logout
2) logged In user can view their blogs Post In their MyBlogs
3) logged User can see Articles of other users
4) logged In user can comment to other Blogs and also on their own Blog.
5) logged in User can delete comments of others from their blog.
6) logged in user can create, update, read ,delete their blog.
7) users can comment on their on other blogs



## Objectives Done

- [x] Implement user authentication using JWT (JSON Web Tokens). Users should be able to sign up, log in, and log out.
- [x] Create an endpoint for CRUD operations on blog posts. Each post should have at least a title, content, and author.
- [x] Implement an endpoint for adding comments to blog posts. Comments should include the commenter's name and content.


### Challanges Faced 

1) Designing The Responsive design for the navbar with Nested Route and 


##### Things  Couldn't Complete In Time

1) Api Testing 
2) few Bugs like after login the user is not redirecting to the home page have to do manually by / route in frontend 
3) In edit blog sometimes the content is not coming in the content textarea and title input; 



#### How to Set Up Locally

Follow these steps to set up and run the FullStackSocialMedia on your local environment:

**Step 1: Clone the Repository**

```bash
git clone https://github.com/ironsummit72/BlogAppAssignment.git
```
**Step 2: Navigate to the Project Directory**

```bash
cd BlogAppAssignment
```

**Step 3: Install Dependencies for both frontend and backend**

using 
```
npm install
```
**create a ```.env``` file in both frontend and backend and copy the nessessary environment variables to the .``env``  file in both backend and frontend **

**Note:** Each frontend and backend has seperate .sample.evn files copy them respectively for.