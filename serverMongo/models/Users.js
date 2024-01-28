const {Schema, model, ObjectId, } = require("mongoose")

//
const TodoSchema = new Schema({
    id: {type: String, required: true},
    label: {type: [String], required: true},
    title: {type: String, required: true},
    color: {type: String, required: true},
    panelChangeBGColor: {type: Boolean, default: false},
    isFavorite: {type: Boolean, default: false},
    labelCheckBox: [
        {
            id: {type: String, required: true},
            title: {type: String, required: true},
            completed: {type: Boolean, default: false}
        }
    ],
    textareaCheckBox: [String],
    dateCreate: {type: Date, required: true},
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
    todos: {
        type: [TodoSchema],
        default: [{
            "id": "498cffb8-3a81-4868-86ba-90b982f5f315",
            "label": ["all"],
            "title": "new",
            "color": "#d3bfdb",
            "panelChangeBGColor": false,
            "isFavorite": true,
            "labelCheckBox": [
                {
                    "id": "d8f0ae72-71d1-4b34-bbd2-80b500b77daf",
                    "title": "555555gddffggggggggggdggd5555555",
                    "completed": false
                },
                {
                    "id": "6fe3ab9c-b79a-491e-9d80-7f7b49cc9433",
                    "title": "111111",
                    "completed": false
                },
            ],
            "textareaCheckBox": [],
            "dateCreate": "2024-01-18T16:44:15.769Z",
            "expandSizeCard": false
        }]
    }
})


module.exports = model('User', User)