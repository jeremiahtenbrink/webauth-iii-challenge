# webAuth v1.0.0

Register users and passwords and collect users information.

- [Login](#login)
	- [Log in a user](#log-in-a-user)
	
- [Registration](#registration)
	- [Register a user](#register-a-user)
	
- [Users](#users)
	- [Get all users](#get-all-users)
	


# Login

## Log in a user



	POST /api/login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>The users email address.</p>							|
| password			| string			|  <p>The users password.</p>							|

### Examples

Post example:

```
axios.post('/api/login', {
    email: "usersEmailAddress@yahoo.com",
    password: "users password"
});
```

### Success Response

Example:

```
{
   message: "Welcome first_name",
   token: token
}
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
# Registration

## Register a user



	POST /api/register


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| firstName			| String			|  <p>Users first name.</p>							|
| lastName			| String			|  <p>Users last name.</p>							|
| email			| String			|  <p>Users email address.</p>							|
| address			| String			|  <p>Users street address.</p>							|
| password			| String			|  <p>Users password.</p>							|

### Examples

Request example:

```
axios.post('/api/register', {
    firstName: "First Name",
    lastName: "Last Name",
    email: "emailAddress@gmail.com",
    address: "street address",
    password: "user password",
});
```

### Success Response

Example:

```
{
       "id": 1,
       "email": "Nolan_Hackett@gmail.com",
       "first_name": "Diego",
       "last_name": "Dach",
       "address": "085 Considine Rue",
       "created_at": "2019-04-01 19:19:22",
       "updated_at": "2019-04-01 19:19:22"
   }
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
# Users

## Get all users



	GET /api/users/

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| string			|  <p>User auth token.</p>							|

### Examples

Get users example:

```
axios.get('/api/users', options: {
    headers: {
        authorization: "User Token"
    }
});
```

### Success Response

Example:

```
[
 {
        "id": 1,
        "email": "Nolan_Hackett@gmail.com",
        "first_name": "Diego",
        "last_name": "Dach",
        "address": "085 Considine Rue",
        "created_at": "2019-04-01 19:19:22",
        "updated_at": "2019-04-01 19:19:22"
    },
 {
        "id": 2,
        "email": "Edythe_Schaden@hotmail.com",
        "first_name": "Peter",
        "last_name": "Rath",
        "address": "16186 Green Bypass",
        "created_at": "2019-04-01 19:19:22",
        "updated_at": "2019-04-01 19:19:22"
    }
]
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```

