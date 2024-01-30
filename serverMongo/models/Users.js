const {Schema, model, ObjectId, } = require("mongoose")

//
const TodoSchema = new Schema({
    id: {type: String },
    label: {type: [String] },
    title: {type: String },
    color: {type: String },
    panelChangeBGColor: {type: Boolean, default: false},
    isFavorite: {type: Boolean, default: false},
    labelCheckBox: [
        {
            id: {type: String, },
            title: {type: String, },
            completed: {type: Boolean, default: false}
        }
    ],
    textareaCheckBox: [String],
    dateCreate: {type: Date, },
    expandSizeCard: {type: Boolean, default: false}
});

//
const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String},
    colorsPalette: {
        type: Array,
        default: ["#fff", "#faafa8", "#f39f76", "#fff8b8", "#e2f6d3", "#b4ddd3", "#efeff1", "#aeccdc", "#d3bfdb", "#f6e2dd", "#e9e3d4", "#e9e3d5"]
    },
    todos: {type: Array}
})


module.exports = model('User', User)