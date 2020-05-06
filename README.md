# Members-only

This is a node/express backend project from [the Odin Project](https://www.theodinproject.com).  
The goal was to setup a small message board with different levels of authorization and authentication.

You can see a live version thanks to Heroku [HERE](https://calm-castle-28467.herokuapp.com/).

### Technologies
* Node -> Express framework
* MongoDB with [mongoose](https://mongoosejs.com/) as an ODM.
* [EJS](https://ejs.co/) as a templating language
* [Passportjs](http://www.passportjs.org/) as an authentication middleware
* Heroku as a free hosting solution

### How it works
The goal of this small app was to deal with authentication and different authorization levels. The rules are layed out in the about page.

1. #### User is not signed up :broken_heart:	
   The user can see messages posted on the homepage, but authors and date of publication are hidden from him. He can't create  messages either.

2. #### User is signed up and logged in :sparkles:
   The user is not yet a full-fledged member. He can now create messages and has access to a "Membership" page with a form that could allow him to become a member, if he supplied the correct password.
   
3. #### User is member :star:
   The user is now able to see the authors and the date of the different messages. He also gains access to a special admin page, that will allow him to become admin, where he to give the correct password.

4. #### User is admin :star2:
    The user can now delete messages, even those he did not write.
  
### Dummy Data
  You can test this app by logging in with the following dummy users that have different levels of privilege
  * Marie Courcillon
    * email: marie.courcillon@gmail.com
    * password: password
    * authorization level : basic
    
  * Honoré Claude
    * email: honore.claude@gmail.com
    * password: password
    * authorization level : member
        
  * Admin
    * email: admin@root.com
    * password: password
    * authorization level : admin

### To run this locally:
* Clone this repo
* install dependencies with npm
* Provide authentication to a mongoDB database via a connection string URI exposed in the MONGODB_URI config variable
  * ex: MONGODB_URI='mongodb+srv://...'
* Provide the following config variables in a `.env` file:
  * SESSION_SECRET = whatever you want it to be (used by express-session)
  * MEMBERS_PWD = the password you want users to enter to become true members
  * ADMIN_PWD = the password you want users to enter to become admins.

* Run the node file named `populate-db.js` to create the appropriate collections and populate them with dummy documents. 
You have to supply your MongoDB connection string as an argument for this => `node populate-db 'mongodb+srv://...`
* run Nodemon with DEBUG config var via the script `devstart` => `npm run devstart`
* Port is 3000 by default
