import connectMongoDB from "@/lib/mongo";
import Comment from "@/models/Comment";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: NextApiResponse) {
    if (request.method !== 'POST') {
        return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), { status: 405 });
    }
    const { comment } = await request.json();

    await connectMongoDB();
    const newComment = await Comment.create({ comment, likes: 0, dislikes: 0, hidden: false }); // Include likes, dislikes, and hidden fields
    return new NextResponse(JSON.stringify({ newComment }), { status: 200 });
}

export async function GET(request: Request, response: NextApiResponse) {
    try {
        await connectMongoDB();

        const comments = await Comment.find();

        comments.reverse();

        return new NextResponse(JSON.stringify(comments), { status: 200 });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return new NextResponse(JSON.stringify({ message: "An error occurred while fetching comments" }), { status: 500 });
    }
}

// New route for updating like count
export async function PUT(request: Request, response: NextApiResponse) {
    try {
        const { action, commentId } = await request.json();

        await connectMongoDB();

        let comment = await Comment.findById(commentId);

        if (!comment) {
            return new NextResponse(JSON.stringify({ message: "Comment not found" }), { status: 404 });
        }

        if (action === 'like') {
            comment.likes += 1;
        } else if (action === 'dislike') {
            comment.dislikes += 1;
        } else if (action === 'hide') {
            comment.hidden = true;
        } else {
            return new NextResponse(JSON.stringify({ message: "Invalid action" }), { status: 400 });
        }

        await comment.save();

        return new NextResponse(JSON.stringify({ message: "Comment updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error updating comment:", error);
        return new NextResponse(JSON.stringify({ message: "An error occurred while updating the comment" }), { status: 500 });
    }
}
