import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema(
    {
        comment: String,
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        hiddenFor: [String],
    },
    {
        timestamps: true
    }
);


const Comment = mongoose.models.comments || mongoose.model('commentsgit a', CommentSchema);

export default Comment;
