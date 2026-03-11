# DevTinder Api

## AuthRouter
- POST /Signup
- POST /Login
- POST /Logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

## userRouter
- GET /user/requests/receive
- GET /user/connections
- GET/feed - Gets you to the profiles of the other users on the platform

Status: ignoreD, interested, accepted, rejected