# Sample CRUD app for managing user TODOs

## Technology used
- Backend
    - NodeJS
    - Typescript
    - PostgreSQL
- Frontend
    - ReactJS (using function components and hooks) with Redux
    - Axios for API calls
    - Styled components (CSS-In-JS)
    - Ant design UI Library

## Pre-requisites

- PostgreSQL and Node should be installed on machinewhere this application is being deployed

## Setting up database

- update database configuration parameters in .env file
- execute file server/database/schema.sql in database which is mentioned in connection parameters

## Starting API server

- review and update parameters in .env
- run following commands
cd server  
npm i  
npm start  

- Seed users is database using following API (This API is still under no security)
POST <baseURL>/adduser
request body:  
{
    "username":"",
    "password":""
}
## Starting Client application

- review and update parameters in .env

cd client  
npm i  
npm start  

## Running unit test cases

cd client  
npm test

## Other Details

- Server is running on port 4000, this configurable from .env

## Scope of improvement

- **Error handling** - All errors are being thrown to users with whaever message is generated, need to convert to custom user-friendly error messages
- Attach pg-monitor to record postgres queries/errors

