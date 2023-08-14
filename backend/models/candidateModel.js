import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
    voters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Replace with the actual user model name
    }],
});

const Candidate = mongoose.model('Candidate', candidateSchema)

export default Candidate