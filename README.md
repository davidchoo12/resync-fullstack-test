# Backend only

I overestimated the time that I have and only managed to work on the basic CRUD backend.
The backend is an express server using sequelize ORM with MySQL. I did not write any SQL code since sequelize handles setting up the tables. I started working on this 2 days ago while I was learning to setup Docker and sequelize.

## Usage
1. Run `docker-compose up`
2. Test the API using the postman collection

## Issues
There are many things to do:
- API authentication using JWT to only allow access to logged in users
- Error handling for invalid foreign key constraints
- Storing of departments' working hours (assuming hours per week, then I need to store start and end times and days of week, eg 9am-6pm monday, 9am-3pm friday, etc)
- Returning the appropriate response body according to frontend's requirements

# No frontend

I never learnt Angular in school and tried to learn it but I could not get it working in time. I tried to use React instead but I did not have enough time. I have more school work this week and next, so I cannot dedicate more time into this.
