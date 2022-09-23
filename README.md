# FilRougeM2i - Backend

# Usage

- Open a terminal at the root of the repository.
- Run the `'npm i'` command
- Request the `.env` file from the repository owner and put it into `'/src/config/'`
- Run the `'npm start'` command

A React frontend is available at [https://github.com/tintincita/FilRougeM2i-Front](https://github.com/tintincita/FilRougeM2i-Front)

# API

## Table

user  
document  
card

## Route

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
