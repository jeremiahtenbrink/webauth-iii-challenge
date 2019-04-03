define({ "api": [
  {
    "type": "post",
    "url": "/api/login",
    "title": "Log in a user",
    "version": "1.0.0",
    "name": "LogInUser",
    "group": "Login",
    "examples": [
      {
        "title": "Post example:",
        "content": "axios.post('/api/login', {\n    email: \"usersEmailAddress@yahoo.com\",\n    password: \"users password\"\n});",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The users email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>The users password.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Example:",
          "content": "{\n   message: \"Welcome first_name\",\n   token: token\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/auth/auth-router.ts",
    "groupTitle": "Login",
    "sampleRequest": [
      {
        "url": "http://localhost:3200/api/login"
      }
    ],
    "error": {
      "fields": {
        "Error XXX": [
          {
            "group": "Error XXX",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>The status code response.</p>"
          },
          {
            "group": "Error XXX",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example:",
          "content": "ERROR XXX\n{\n    \"status\": xxx,\n    \"message\": \"Some Error Message\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "Register a user",
    "version": "1.0.0",
    "name": "RegisterUser",
    "group": "Registration",
    "examples": [
      {
        "title": "Request example:",
        "content": "axios.post('/api/register', {\n    firstName: \"First Name\",\n    lastName: \"Last Name\",\n    email: \"emailAddress@gmail.com\",\n    address: \"street address\",\n    password: \"user password\",\n});",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Users first name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Users last name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Users street address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the new registered user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>Users first name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Users last name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email address.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Users street address.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "created_at",
            "description": "<p>Timestamp the user was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Timestamp the user was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example:",
          "content": "{\n       \"id\": 1,\n       \"email\": \"Nolan_Hackett@gmail.com\",\n       \"first_name\": \"Diego\",\n       \"last_name\": \"Dach\",\n       \"address\": \"085 Considine Rue\",\n       \"created_at\": \"2019-04-01 19:19:22\",\n       \"updated_at\": \"2019-04-01 19:19:22\"\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "src/auth/auth-router.ts",
    "groupTitle": "Registration",
    "sampleRequest": [
      {
        "url": "http://localhost:3200/api/register"
      }
    ],
    "error": {
      "fields": {
        "Error XXX": [
          {
            "group": "Error XXX",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>The status code response.</p>"
          },
          {
            "group": "Error XXX",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example:",
          "content": "ERROR XXX\n{\n    \"status\": xxx,\n    \"message\": \"Some Error Message\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/",
    "title": "Get all users",
    "version": "1.0.0",
    "name": "GetUsers",
    "group": "Users",
    "permission": [
      {
        "name": "Users",
        "title": "Must be logged in.",
        "description": ""
      }
    ],
    "examples": [
      {
        "title": "Get users example:",
        "content": "axios.get('/api/users', options: {\n    headers: {\n        authorization: \"User Token\"\n    }\n});",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>User auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>Users first name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Users last name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Users street address.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "created_at",
            "description": "<p>Account created at date and time.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Last time account was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example:",
          "content": "[\n {\n        \"id\": 1,\n        \"email\": \"Nolan_Hackett@gmail.com\",\n        \"first_name\": \"Diego\",\n        \"last_name\": \"Dach\",\n        \"address\": \"085 Considine Rue\",\n        \"created_at\": \"2019-04-01 19:19:22\",\n        \"updated_at\": \"2019-04-01 19:19:22\"\n    },\n {\n        \"id\": 2,\n        \"email\": \"Edythe_Schaden@hotmail.com\",\n        \"first_name\": \"Peter\",\n        \"last_name\": \"Rath\",\n        \"address\": \"16186 Green Bypass\",\n        \"created_at\": \"2019-04-01 19:19:22\",\n        \"updated_at\": \"2019-04-01 19:19:22\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/users/users.ts",
    "groupTitle": "Must be logged in.",
    "sampleRequest": [
      {
        "url": "http://localhost:3200/api/users/"
      }
    ],
    "error": {
      "fields": {
        "Error XXX": [
          {
            "group": "Error XXX",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>The status code response.</p>"
          },
          {
            "group": "Error XXX",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example:",
          "content": "ERROR XXX\n{\n    \"status\": xxx,\n    \"message\": \"Some Error Message\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
