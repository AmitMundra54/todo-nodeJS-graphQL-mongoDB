import { GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLObjectType,GraphQLNonNull } from "graphql";
import { Todo } from "./Model";
import { ToDoList } from "../DataBase/Models/TodoSchema";

export const Mutation = new GraphQLObjectType({
          name : "Mutation",
          fields : {
            addTodo : {
                type : Todo,
                args:{
                    id: {type: new GraphQLNonNull(GraphQLInt)}, 
                    name: {type: new GraphQLNonNull(GraphQLString)},
                    status: {type: new GraphQLNonNull(GraphQLString)}  
                },
                resolve: (parentValue,args)=>{
                    const todoObject= new ToDoList(args);
                    todoObject.save((err, result) =>{
                        return err ? console.log("Mongooes Error :-",err) :  result; 
                    });
                    return args; 
                }
                
            },
            updateTodo : {
                type : Todo,
                args:{
                    id: {type:GraphQLInt}, 
                    name: {type:GraphQLString},
                    status: {type:GraphQLString}   
                },
                resolve: (parentValue, args)=>{
                    
                    const todo = new Promise((resolve, reject) => {
                        ToDoList.findOneAndUpdate({id:args.id}, { $set:args},{new: true},function (err, todo) {
                            err? reject(err) : resolve(todo) 
                          });
                    });                    
                   return todo;
                }
                
            },
            deleteTodo : {
                type : Todo,
                args:{
                    id: {type:GraphQLInt} 
                },
                resolve: (parentValue,args)=>{
                    const todo = new Promise((resolve, reject) => {
                        ToDoList.findOneAndRemove({id:args.id},function (err, todo) {
                            err? reject(err) : resolve(todo) 
                          });
                    });                    
                   return todo;
                }               
            },
            statusBasedUpdate: {
                type : new GraphQLObjectType({name:"update", fields:()=>(
                    {
                        ok:{type: GraphQLInt}
                    }
                )}),
                args:{
                    status: {type:GraphQLString} 
                },
                resolve:  (parentValue,args)=>{
                    
                   
                    const todo =  new Promise((resolve, reject) => {
                       ToDoList.updateMany({}, { $set: args}, {multi: true, new:true} , function (err, todos) {
                            err? reject(err) : resolve(todos) 
                          });                   
                    });
                    return todo          
                }
            }
          }
}); 