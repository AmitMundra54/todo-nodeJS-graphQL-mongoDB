import { GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLObjectType,GraphQLNonNull } from "graphql";
import { db } from "../build/db";
import { Todo } from "./Model";
import { Overalls } from "./Model";
import { ToDoList } from "../DataBase/Models/TodoSchema";


export const Query = new GraphQLObjectType({
    name: "QueryType",
    fields:{
        overall: {
                type: Overalls,
                resolve: () => {
                    let todoNo = 0;
                    todoNo = new Promise((resolve, reject) => {
                        ToDoList.find().count((err, result) => {
                            err?reject(err):resolve(result)
                        });

                    });
                    let active = new Promise((resolve, reject) => {
                        ToDoList.find({status: "active"}).count((err, result) => {
                            err?reject(err):resolve(result)
                        });

                    });
                    let completed = new Promise((resolve, reject) => {
                        ToDoList.find({status: "completed"}).count((err, result) => {
                            err?reject(err):resolve(result)
                        });

                    });
                    return { todoNo: todoNo, active: active, completed: completed }
                }

        },
        fetchTodo : {
            type : Todo,
            args:{
                id: {type: GraphQLInt} 
            },
            resolve: (parentValue,args)=>{
                var foundItems = new Promise((resolve, reject) => {
                    ToDoList.find({id:args.id},(err,todo) => {                        
                        err ? reject(err) : resolve(todo[0])
                    });
                })
                return foundItems;
            }
            
        },
        fetchTodos : {
            type : new GraphQLList(Todo),
            resolve: (args) => {
                var foundItems = new Promise((resolve, reject) => {
                    ToDoList.find({},(err, todos) => {
                        err ? reject(err) : resolve(todos)
                    })
                })
                return foundItems;
            }
        },
        statusBasedTodos : {
            type : GraphQLList(Todo),
            args:{
                status: {type: GraphQLString} 
            },
            resolve: (parentValue, args) => {
                    let active = new Promise((resolve, reject) => {
                        ToDoList.find({status: args.status},(err,todo) => {   
                            err ? reject(err) : resolve(todo)
                        });
                    });
                   
                    return active;
                
            }
        }
    }
}) 