# How start aplication locally

Before starting up application, you should create ```.env``` file in project root directory with keys listed here ENV keys sections

After that type ```npm i``` , then ```npm start``` to start up the project, and, finally, you can see aplication [here](http://localhost:3000)


# How to build prooject
To build project type ```npm build```, and, after that, ```build``` folder should apear where all static files are placed.

# ENV keys

REACT_APP_OAUTH_CLIENT_ID - Unsplash client id \
REACT_APP_OAUTH_CLIENT_SECRET - Unsplash client secret \
REACT_APP_TOKEN_URL - Unsplash oauth token url \
REACT_APP_AUTHORIZATION_URL - Unsplash oauth pop up authorization url \
REACT_APP_REDIRECT_URL - Unsplash oauth redirect url \
REACT_APP_GRANT_TYPE - should be ```code``` \
REACT_APP_SCOPE - your desired scope, list of all scope you can find [here](https://unsplash.com/documentation/user-authentication-workflow#permission-scopes) \
REACT_APP_RESPONSE_CODE - shold be ```authorization_code```
