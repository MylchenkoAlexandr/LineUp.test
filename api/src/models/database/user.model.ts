import {model, Schema} from "mongoose";

export default model("User", new Schema({
    username: {type: String, unique: true, required: true},
    hash: {type: String, required: true}
}));
