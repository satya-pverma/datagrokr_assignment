# datagrokr_assignment
This application is live at heroku
Heroku link:- https://datagro.herokuapp.com/home

-------------------------------------------------------------------------------------------------------------------------------------------------

Technology used in the project:-
1. Source code folder contains server side as well as client side code.
2. Backend is developed using Node(express)
3. MongoDB is used for the database requirement.
4. Reactjs is used for the front-end
5. For styling thepages I have used materialize-css.
few other librabry has been used for the development for eg:- mongoose,react-routerdom,materialize-css,jsonwebtoken, bcrypt.js.
NOTE:- Assignment is developed with MERN stack technology.so Node js must be installed in
 order to run the application.

-------------------------------------------------------------------------------------------------------------------------------------------------

Steps to run application:-
1. Once Node.js is installed then user need to go to server folder and open server folder in
command prompt,and run the command “npm install” in order to install all the server side
dependency.
2. Similarly user need to go to client folder and open client folder in command prompt ,and run the
command “npm install” in order to install all the client side dependency.
3. Once server side and client side dependency installed ,then user need to start the backend
server.for starting backend server user needs to go to server folder and open it in command
prompt and run the command “node app” . it will start the server at port 7000.
4. Once server started then user need to open client folder in command prompt and run the
command “npm start”.this command will start the react development server(it takes 1-2 min).
once development server gets started it will automatically open chrome browser at
localhost:3000 and the application will be visible.(if chrome browser donot gets automatically
open then open the chrome manually and write the url – “localhost:3000”.it will open the
application)

--------------------------------------------------------------------------------------------------------------------------------------------------

Description of the project:-
This project is developed using MERN stack .Application provides the following facilities:-
1. Create account.
2. Login to application
3. Upload posts
4. Like other posts
5. Comment on other posts
User can directly view all the uploaded posts without logged in but wont be able to like comment and
upload posts. All these facilities will be provided once the user is logged in.
Home page consists of posts, name of person posted the post, number of likes and comments on the
posts, comment section and a link to view all comments.
Once user is logged in then user will be able to upload his own post, delete his own posts and edit his
own posts.all these links will appear once user is logged in.
If the post is not created by the logged in user, then the link for deleting that post and editing that post
will be not visible.
