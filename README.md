# FilRougeM2i - Backend

# Description

Backend server built with Express and MongoDB designed to work with the frontend application FilRougeM2i - Frontend available at https://github.com/tintincita/FilRougeM2i-Front

# Usage

To run the server : 

- Open a terminal at the root of the repository.  
- Run the `'npm i'` command
- Request the `.env` file from the repository owner and put it into `'/src'`
- Run the `'npm start'` command

Get and run the frontend application available at https://github.com/tintincita/FilRougeM2i-Front

# API 

## Tables
user  
document
card
group

## Routes
### Create a record  
Use the POST method from  
`\<server\>/api/\<table\>`

### Get all records
Use the GET method from   
`\<server\>/api/\<table\>`

### Get a record by ID
Use the GET method from  
`\<server\>/api/\<table\>/:id`

### Update a record by ID
Use the PUT method from  
`\<server\>/api/\<table\>/:id`

### Delete a record by ID
Use the DELETE method from  
`\<server\>/api/\<table\>/:id`
