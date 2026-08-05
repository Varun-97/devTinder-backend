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
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## user router
- GET /user/connections
- GET /user/requests/recieved
- GET /user/feed