const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },

    idUser: {
        type:Number
    },
    
    email: {
        unique:[true,"change the email"],
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (value.length < 7) {
            throw new Error("email should be more than 7 characters!");
        }},
        validate(value){
            if(!"@".includes(value)) throw "you must use @"
        },
        validate(value){
            if(!value.split("@")[1].includes(".")) throw "Invalid email"   
        },
    },
        password: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < 7) {
                throw new Error("Password should be more than 7 characters!");

        }
    }
    },
        age: {
            type: Number,
            default: 0,
            required: true,
    },
        tasks: {
            type: [Number],
            default: [],

     }


    
});

module.exports = mongoose.model("user", userSchema )