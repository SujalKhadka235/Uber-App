Markdown

# /users/register Endpoint Documentation

This document describes the `/users/register` endpoint, which is used to create new user accounts.

## Description

The `/users/register` endpoint allows users to create new accounts by providing their full name, email address, and password. The endpoint validates the provided data, hashes the password, and creates a new user in the system.

## Request Method

- `POST`

## Request Body

The request body should be a JSON object with the following fields:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "[email address removed]",
  "password": "securePassword123"
}
Required Fields:

fullName: An object containing the user's first and last names.
firstName: (String) The user's first name. Must be at least 3 characters long.
lastName: (String) The user's last name. Must be at least 3 characters long.
email: (String) The user's email address. Must be a valid and unique email.
password: (String) The user's password. Must be at least 6 characters long.
Response
Success (201 Created)
If the user is successfully created, the server responds with a 201 Created status code and a JSON object containing the created user's information and an authentication token.

Example Response:

JSON

{
  "createdUser": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "[email address removed]",
    "_id": "6123456789abcdef01234567"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTIzNDU2Nzg5YWJjZGVmMDEyMzQ1NjciLCJpYXQiOjE2MzQ1Njc4OTB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
Error Responses
400 Bad Request:

Returned when the request body is missing required fields or if the provided data fails validation (e.g., invalid email format, short password, short names).
Example Response (Invalid Email):

JSON

{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
Example Response (Short First Name):

JSON

{
  "errors": [
    {
      "msg": "firstname must be 3 characters long",
      "param": "fullName.firstName",
      "location": "body"
    }
  ]
}
Example Response (Short Password):

JSON

{
  "errors": [
    {
      "msg": "password must be atleast 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
409 Conflict:

Returned when the provided email address is already registered.
Example Response:

JSON

{
  "message": "email is already taken"
}
500 Internal Server Error:

Returned when an unexpected error occurs on the server.
Example Response:

JSON

{
  "message": "Internal server error"
}
Example Usage (cURL)
Bash

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "[email address removed]",
    "password": "strongPassword456"
  }' \
  http://localhost:7550/users/register
```
