# PXL 3 tier web application sample app
## frontend
Angular 12

## API endpoint url
The API url is defined in the file `/frontend/environments/environment.prod.ts`. This value gets set by the `APIURL` argument in the `docker-compose.yml` file. The multistage docker build uses this value before the build process.

## Backend
NodeJS + express + aws-SDK/dynamoDB

there is a `/health` endpoint for a healthcheck

image carrousel urls are located in `/backend/data/carrousel.json`

### Database
DynamoDB OR You could test locally with DynamoDB-local

The table name is set in `./backend/controllers/todo.controller.js` and can be manipulated by the env variable `AWS_TABLE_NAME`

The connection to the database is managed by the AWS-SDK by default. but can be adjusted in `./backend/aws.js` and `docker-compose.yml`.

## Setup
* make sure the `apiUrl` property in `./frontend/src/environments/environment.prod.ts` is correctly set
* make sure the correct IAM roles are set *or* that the aws-sdk config is set in `./backend/aws.js` and `docker-compose.yml` (please don't provide tokens in the compose file directly).
* run `docker-compose build && docker-compose up` to boot
