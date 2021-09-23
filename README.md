# front:
* javascript
* redux
* ant-design

# api (back-end):
* type-script
* express
* mongdb

## routes:
POST //localhost:7777/api/authentication  
`{ username:String, password: String }`  

POST //localhost:7777/api/registration  
`{ username:String, password: String }`  

GET //localhost:7777/api/blog/:page  
`{ page:Number }`  

POST //localhost:7777/api/blog  
`{ title:String, content: String }`  

PUT //localhost:7777/api/blog  
`{ _id:String, title:String, content: String }`

DELETE //localhost:7777/api/blog/:id  
`{ id:String }`

# accounts for test:
`1`  
**username**: 1@lineup.com  
**password**: 111111  

`2`  
**username**: 2@lineup.com  
**password**: 222222  
