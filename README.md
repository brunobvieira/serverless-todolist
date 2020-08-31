# Serverless TODO LIST APP

This is a tiny REST API todo list app project, made with **Node.js** and **Serverless Framework** for **AWS LAMBDA**.

# SETUP

This code above will start local server:

```
npm install -g serverless
npm run dev
```

For deploy you will need set the aws [credentials](https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/) and execute:
```
serverless deploy
```

# CI/CD

This project has a simple gitlab CI/CD pipeline

## CI/CD ENV VARIABLES

### PROD VARIABLES
* NODE_ENV
* SECRET
* DBDIALECT
* DBPORT
* DBHOST
* DBUSER
* DBPASSWORD
* DBDATABASE

### DEV VARIABLES
* DBHOST_DEV
* DBUSER_DEV
* DBPASSWORD_DEV
* DBDATABASE_DEV


# FOR MORE
[Serverless Documentarion](https://www.serverless.com/framework/docs/providers/aws/)

