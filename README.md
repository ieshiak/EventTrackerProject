# EventTrackerProject
developed by Ieshia Parker

The Dream Journal Application is deployed and accessible online. You can access the application by visiting the following link: 
 http://your-domain.com

## Overview

The Dream Journal Application is a web-based platform designed to help users record, manage, and reflect on their dreams. It provides users with a convenient way to document their dreams, explore patterns, and gain insights into their subconscious mind.

Users can log in to their accounts, add new dream entries, view their existing dreams, update dream details, and delete dreams as needed. The application offers a user-friendly interface that simplifies the process of recording and managing dream entries. Through the Dream Journal Application, users can track their dream experiences, analyze trends, and reflect on their subconscious thoughts and emotions.
## Login Credentials

To log in to the application, please use the following credentials: <br>
Username: [Your username] <br>
Password: [Your password]

## RESTful API Endpoints
<center><span style="font-size: larger; font-weight: bold;">Dreams REST Endpoints</center>

| HTTP Verb | URI              | Request Body                   | Response Body                  | Status Codes       |
|-----------|------------------|--------------------------------|--------------------------------|--------------------|
| GET       | `/api/dreams`     |                                | List of all _dream_ entities   | 200                |
| GET       | `/api/dreams/1`  |                                | JSON of _dream_ `1`           | 200, 404           |
| POST      | `/api/dreams`     | JSON of a new _dream_ entity   | JSON of created _dream_        | 201, 400           |
| PUT       | `/api/dreams/1`  | JSON of a new version of _dream_ `1` | JSON of updated _dream_  | 200, 404, 400      |
| DELETE    | `/api/dreams/1`  |                                |                                | 204, 404, 400      |
| GET       | `/api/dreams/search/emotion/fear`     |                                | List of all _dreams_ by emotions   | 200, 404 
| GET       | `/api/dreams/search/type/nightmare`     |                                | List of all _dreams_ by type   | 200, 404 
| GET       | `/api/dreams/search/forest nightmare`     |                                | Search of _dreams_ by Title | 200, 404
| GET       | `/api/dreams/count`     |                                | Count of all _dreams_   | 200 

<center><span style="font-size: larger; font-weight: bold;">Users REST Endpoints</center>

| HTTP Verb | URI              | Request Body                   | Response Body                  | Status Codes       |
|-----------|------------------|--------------------------------|--------------------------------|--------------------|
| GET       | `/api/users`     |                                | List of all _user_ entities   | 200                |
| GET       | `/api/users/1`  |                                | JSON of _user_ `1`           | 200, 404           |
| POST      | `/api/users`     | JSON of a new _user_ entity   | JSON of created _user_        | 201, 400           |
| PUT       | `/api/users/1`  | JSON of a new version of _user_ `1` | JSON of updated _user_  | 200, 404, 400      |
| DELETE    | `/api/users/1`  |                                |                                | 204, 404, 400      |
| GET       | `/api/users/search/zodiacsign/cancer`     |                                | List of all _users_ by zodiac sign   | 200, 404 
| GET       | `/api/users/search/role/ADMIN`     |                                | List of all _users_ by role   | 200, 404 
| GET       | `/api/users/search/ieshiak`     |                                | Search of _users_ by username | 200, 404
| GET       | `/api/users/count`     |                                | Count of all _users_   | 200 


## Technologies and Methodologies Used
- Java
- Spring Boot
- SQL
- HTML
- Bootstrap
- REST
- MYSQL
- Visual Studio Code

## Resources Used
- Avatar Icons -
<a href="https://www.freepik.com/free-vector/collection-emojis-flat-style_41630286.htm#query=emoji%20clipart&position=21&from_view=keyword&track=ais&uuid=04ec5ab0-f14f-408a-949e-7651d2101101">Image by Vectonauta</a>
- Rest Tutorials -
<a href="https://spring.io/guides/tutorials/rest">Spring.io</a> 