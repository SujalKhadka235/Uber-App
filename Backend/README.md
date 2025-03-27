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
  "email": "[email address]",
  "password": "securePassword123"
}
```

# /users/login Endpoint Documentation

This document describes the `/users/login` endpoint, which is used to log in user accounts.

## Description

The `/users/login` endpoint allows users to enter thier credentials and get a token back for authorzied routes

## Request Method

- `POST`

## Request Body

The request body should be a JSON object with the following fields:

```json
{
  "email": "[email address]",
  "password": "securePassword123"
}
```
