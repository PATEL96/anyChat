import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema(
    {
        comment: String,
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
    },
    {
        timestamps: true
    }
);


const Comment = mongoose.models.comments || mongoose.model('comments', CommentSchema);

export default Comment;
