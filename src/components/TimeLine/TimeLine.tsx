'use client'
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import './page.css';
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

async function getComments() {
	try {
		const res = await fetch('/api/comments', {
			cache: 'no-store',
		});

		if (!res.ok) {
			throw new Error("Failed to Fetch Data.");
		}

		return res.json();

	} catch (error) {
		console.log(error);
	}
}

function convertTimestampToSimpleDate(timestamp: string): string {
	const date = new Date(timestamp);

	const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

	const currentTime = new Date();
	const hoursAgo = Math.floor((currentTime.getTime() - date.getTime()) / (1000 * 3600));

	return `${formattedDate} (${hoursAgo} hours ago)`;
}

async function handleLikeDislike(commentId: string, action: string, setComments) {
	try {
		const res = await fetch('/api/comments', {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ action, commentId })
		});

		if (!res.ok) {
			throw new Error("Failed to perform action.");
		}

		// Update UI instantly with new values
		const updatedComments = await getComments();
		setComments(updatedComments || [{ comment: "Loading" }]);

	} catch (error) {
		console.error("Error handling like/dislike:", error);
	}
}

export function TimeLine() {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchComments = async () => {
			const data = await getComments();
			setComments(data || [{ comment: "Loading" }]);
		};

		// Initial fetch
		fetchComments();

		// Set interval to fetch every 10 minutes
		const intervalId = setInterval(fetchComments, 5 * 60 * 1000);

		// Cleanup function to clear interval when component unmounts or useEffect reruns
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="flex items-center">
			<div className="TimeLine">
				{comments.map((element) => (
					<div key={element._id} onDoubleClick={() => handleLikeDislike(element._id, 'like', setComments)}>
						<div className="Element m-5" key={element._id}>
							<div>
								<p key={element._id}>{element.comment}</p>
							</div>
						</div>
						<div className=" text-[10px] p-[5px]">
							{convertTimestampToSimpleDate(element.createdAt)}
						</div>
						<Separator />
						<div className=' flex align-middle w-full'>
							<Button variant='ghost' onClick={() => handleLikeDislike(element._id, 'like', setComments)}>
								<ArrowUpIcon color='#22B357' /> {element.likes}
							</Button>
							<Button variant="ghost" onClick={() => handleLikeDislike(element._id, 'dislike', setComments)}>
								<ArrowDownIcon color='#22B357' /> {element.dislikes}
							</Button>
						</div>
					</div>
				))}
			</div>
			<Navbar />
		</div>
	)
}
