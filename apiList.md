#DEV Tinder APIs

## authRouter
-POST /signuo
-POST /login
-POST /logout

## profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## connectionRequestRouter
-POST /request/send/:status/:userId(user side)(interes/ignore)

-POST /request/review/:status/:requestId(receiver side)(accept/reject)

## we have to consider all corner cases while building apis 

-we can not sent the request if it already exist
- we can not sent the request by user itself
-we have to check if the sender is exist in the database or not
-indexing type {index:true}
-explore about compound index(for two fields together)
-index schematypes(1,-1,etc)


## userRouter
-GET /user/connections
-GET /user/requests/received
-GET /user/feed

status ignore,interested,accepted,rejected