import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema(
	{
		comment: String,
	},
	{
		timestamps: true
	}
);

const Comment = mongoose.models.comments || mongoose.model('comments', CommentSchema);

export default Comment;
