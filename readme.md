# API Morada APP

## Modules
- Usuarios
- Propiedades
- Favoritos

## API Reference

### Usuarios
Method | Endpoint | Request       | Auth Requiered
------ | -------- | ------------- | ---------------
`Post` | /users/login   | body : { email, password } | No
`Post` | /users/signup   | body : { name, documentType, document... } | No
`get` | /users/info |-------------| si

### Propiedades
Method | Endpoint | Request       | Auth Requiered
------ | -------- | ------------- | ---------------
`Get` | /properties | query: type, businessType  | No
`Get` | /properties/id | url: id                 | No
`Post` | /properties |body { title, valor,....}  | si
`Put` | /properties/id |body { title, valor,....}  | si
`Delete` | /properties/id | url: id              | si
`Post` | /properties/id |body { comentario }     | si

### favoritos
Method | Endpoint | Request       | Auth Requiered
------ | -------- | ------------- | ---------------
`Get` | /favorites | ------------  | si
`Post` | /favorites |body { userId, propertyId}  | si