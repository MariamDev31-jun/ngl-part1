import mongoose, {Schema,model} from "mongoose";
const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,

    },
    receiver:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sender:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{
    timestamps: {
        createdAt: true,
    }
});
export const Message = mongoose.model("Message", messageSchema);