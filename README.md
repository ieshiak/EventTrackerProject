# EventTrackerProject
## Dreams REST Endpoints
| HTTP Verb | URI              | Request Body                   | Response Body                  | Status Codes       |
|-----------|------------------|--------------------------------|--------------------------------|--------------------|
| GET       | `/api/dreams`     |                                | List of all _dream_ entities   | 200                |
| GET       | `/api/dreams/1`  |                                | JSON of _dream_ `1`           | 200, 404           |
| POST      | `/api/dreams`     | JSON of a new _dream_ entity   | JSON of created _dream_        | 201, 400           |
| PUT       | `/api/books/1`  | JSON of a new version of _dream_ `1` | JSON of updated _dream_  | 200, 404, 400      |
| DELETE    | `/api/dreams/1`  |                                |                                | 204, 404, 400      |
| GET       | `/api/dreams/search/emotion/fear`     |                                | List of all _dreams_ by emotions   | 200, 404 
| GET       | `/api/dreams/search/type/nightmare`     |                                | List of all _dreams_ by type   | 200, 404 
| GET       | `/api/dreams/search/forest nightmare`     |                                | Search of all _dreams_ by Title | 200, 404
| GET       | `/api/dreams/count`     |                                | Count of all _dreams_   | 200 


## Users REST Endpoints
| HTTP Verb | URI              | Request Body                   | Response Body                  | Status Codes       |
|-----------|------------------|--------------------------------|--------------------------------|--------------------|
| GET       | `/api/books`     |                                | List of all _book_ entities   | 200                |
| GET       | `/api/books/17`  |                                | JSON of _book_ `17`           | 200, 404           |
| POST      | `/api/books`     | JSON of a new _book_ entity   | JSON of created _book_        | 201, 400           |
| PUT       | `/api/books/17`  | JSON of a new version of _book_ `17` | JSON of updated _book_  | 200, 404, 400      |
| DELETE    | `/api/books/17`  |                                |                                | 204, 404, 400      |



<a href="https://www.freepik.com/free-vector/collection-emojis-flat-style_41630286.htm#query=emoji%20clipart&position=21&from_view=keyword&track=ais&uuid=04ec5ab0-f14f-408a-949e-7651d2101101">Image by Vectonauta</a> on Freepik
