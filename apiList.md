## Dev tinder apis

## auth router
- POST /signup
- POST /login
- POST /logout

## profile router
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## Status: ignore, intrested, accepted, rejected

## connection request router
- POST /request/send/intrested/:userId
- POST /request/send/ignore/:userId
- POST /request/send/:status/:toUserId generic form

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId
- POST /request/review/:status/:requestId generic form

## user router
- GET /user/requests/received
- GET /user/connections
- GET /user/feed