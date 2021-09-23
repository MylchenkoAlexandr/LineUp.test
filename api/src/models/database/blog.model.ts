import {model, Schema} from "mongoose";

export default model("Blog", new Schema({
    title: { type: String },
    content: { type: String },
    dateCreated: { type: Number, default: 0 }
}));
