import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from "graphql";
export const Todo = new GraphQLObjectType({
    name : "Todo",
    fields: () => ({
        id : {type:GraphQLInt},
        name : {type:GraphQLString},
        status : {type:GraphQLString}
    })
});

export const Overalls = new GraphQLObjectType({
    name : "Overalls",
    fields: () => ({
        todoNo : {type:GraphQLInt},
        active : {type:GraphQLInt},
        completed : {type:GraphQLInt}
    })
})
