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
- POST /request/send/interested/:userId
- POST /request/review/rejected/:requestId

## userRouter
- GET /connections
- GET /requests/received
- GET/feed - Gets you to the profiles of the other users on the platform

Status: ignore, interested, accepted, rejected