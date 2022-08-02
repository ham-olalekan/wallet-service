## Introduction

This project is a backend application of built for zuvy assessment.

It's a wallet service that hold values for users and allows users to transfer value.

## Decisions

- Nest.js framework was used.
- Authentication and Authorization was deliberately left oout given the time constraints
- Postgres DB was used for storage

## Decisions

- User cant transfer to self
- Minimum transfer amount is 10 kobo(0.1 Naira)

## Setup

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### Start the Server with Docker
Run the following Docker commands in the project root directory to run the application

- `docker compose up --build`

OR

### Install the Dependencies
install and run postgres server locally

install project dependencies by running this command in the project 
- `npm i`

Then run this command to install Nest.js
- `npm install -g @nestjs/cli`

- `npm run start:dev` or `nest start`
 
 Your application should be running on port 3000 

 
This will launch the Node server on port 8080. If that port is busy, you can set a different point in .env file

- import the postman collection with this link
  https://www.getpostman.com/collections/ec13f334a8f344c89c8f

