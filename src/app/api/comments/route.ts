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
    const newComment = Comment.create({ comment });
    return new NextResponse(JSON.stringify(newComment), { status: 200 });
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
