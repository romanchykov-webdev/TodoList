const {Schema, model, ObjectId} = require("mongoose")

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String},
    todos: [{type: ObjectId, ref: 'Todo',default:{}}]
})


module.exports = model('User', User)