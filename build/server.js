const Koa = require('koa');
const Router = require('koa-router'); // koa-router@7.x
const graphqlHTTP = require('koa-graphql');
import { db } from "./db";
import { schema  } from "../Todo/Schema";
const cors = require('@koa/cors');


const app = new Koa();
app.use(cors());


const router = new Router();

db.connect('mongodb://localhost:27017/test',(err, result)=>{
      console.log("Connected")
});


router.all('/graphql' ,graphqlHTTP({
  schema: schema,
  graphiql: true
}));


app.use(router.routes()).use(router.allowedMethods());


app.listen(4005, ()=>{
    console.log("===3001======");
    
})