const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    company: {
        type:String
    },
    location: {
        type:String
    },
    status: {
        type: String,
        reuqired:true
    },
    skills: {
        type:[String]
    },
    website: {
        type:String
    },
    bio: {
        type:String
    },
    githubusername: {
        type:String
    }
})