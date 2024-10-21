-create a repository 

-initialize the repository (npm init)
-install express
-create a server
-create gitignore to ignore node modules
-listen to port
-install nodemon and update scripts inside package.json
-initialize git
-create github repositort to push local repository
-order of the routes matters a lot
-install postman to test the apis
-regular expressions in routes ((ab)?(means ab is optional),b+(we can add many bs),(ab*cd)*(means in between we can use anything))
-app.use(we can use all methods get,delete,post,put)
-multiple routes can by handled by next()
-error handling
-to connect to the database have to create config 
-install mongoose
-call to the connectDB function and connect to database before listening to the port 5000
-create a userschema and user model
-pushing some documents to the database collection
-error handling when handling the db operations
-creating REST apis
-adding custom validations to the schema
-add timestamps to the users schema
-add api level validation on patch request and signup post api
-data sanitizing- add api validation for each field
-install validator (npm i validator) to validate (ex:email)
-never trust req.body
-install bcrypt to encrypt the password(npm i bcrypt)
-create login api
-compare passowrds and emaild while login


-Authentication JWT token
-install cookie parser, install jwt token
-send dummy cookie and explore with jwt token
-implementing logic for jwt token
-create the userAuth miidleware and used in the middlewares
-set the expire date for token and cookies
-create user schema methods for get JWT token and password encryption, validate
-introducing the express router
-creating seperate folder  for routers
-created connection request schema
-$or and $and query 
-read more about logical queries
-why should not create more indexes into databases
-why do we need index
-advantages and disadvantages of index
-reading article about index

-Thought process of get and post
-read about ref and populate in mongoose database
-create get /users/requests/received
-explore the $nin, $ne, $and query operators
-pagination

-/feed?page=1&limit=10=>first 10 users 1-10
-/feed?page=2&limit=10=>11-20
-/feed?page=3&limit=10=>21-30

skip(), limit() methods in mongoose

skip=(page-1)*limit
