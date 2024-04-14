'use client'
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import './page.css';
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { ArrowUpIcon, ArrowDownIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useSession } from 'next-auth/react';

async function getComments(userName: string) {
	try {
		const res = await fetch('/api/comments', {
			cache: 'no-store',
			headers: {
				"userName": `${userName}`,
			},
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

async function handleLikeDislike(commentId: string, action: string, setComments, userName: string) {

	try {
		const res = await fetch('/api/comments', {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ action, commentId, userName })
		});

		if (!res.ok) {
			throw new Error("Failed to perform action.");
		}

		// Update UI instantly with new values
		const updatedComments = await getComments(userName);
		setComments(updatedComments || [{ comment: "Loading" }]);

	} catch (error) {
		console.error("Error handling like/dislike:", error);
	}
}

export function TimeLine() {
	const [comments, setComments] = useState([]);
	const [name, setName] = useState("")
	const { data: session } = useSession();
	const userName = session?.user?.name;
	useEffect(() => {
		if (session) {
			setName(session?.user?.name)
		}
		const fetchComments = async () => {
			const data = await getComments(userName);
			setComments(data || [{ comment: "Loading" }]);
		};

		fetchComments();
		// Initial fetch

		// Set interval to fetch every 10 minutes
		const intervalId = setInterval(fetchComments, 30 * 1000);

		// Cleanup function to clear interval when component unmounts or useEffect reruns
		return () => clearInterval(intervalId);
	}, [session]);

	if (session) {


		return (
			<div className="flex items-center">
				<div className="TimeLine">
					{comments.map((element) => (
						<div key={element._id} onDoubleClick={() => handleLikeDislike(element._id, 'like', setComments, name)}>
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
								<Button variant='ghost' onClick={() => handleLikeDislike(element._id, 'like', setComments, name)}>
									<ArrowUpIcon color='#22B357' /> {element.likes}
								</Button>
								<Button variant="ghost" onClick={() => handleLikeDislike(element._id, 'dislike', setComments, name)}>
									<ArrowDownIcon color='#22B357' /> {element.dislikes}
								</Button>
								<Button variant="ghost" onClick={() => handleLikeDislike(element._id, 'hide', setComments, name)}>
									<EyeClosedIcon color='#22B357' />
								</Button>
							</div>
						</div>
					))}
				</div>
				<Navbar />
			</div>
		)
	} else {
		return (
			<div className="flex items-center">
				<div className="TimeLine">
					{comments.map((element) => (
						<div key={element._id}>
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
								<Button variant='ghost' disabled onClick={() => handleLikeDislike(element._id, 'like', setComments, name)}>
									<ArrowUpIcon color='#22B357' /> {element.likes}
								</Button>
								<Button variant="ghost" disabled onClick={() => handleLikeDislike(element._id, 'dislike', setComments, name)}>
									<ArrowDownIcon color='#22B357' /> {element.dislikes}
								</Button>
								<Button variant="ghost" disabled onClick={() => handleLikeDislike(element._id, 'hide', setComments, name)}>
									<EyeClosedIcon color='#22B357' />
								</Button>
							</div>
						</div>
					))}
				</div>
				<Navbar />
			</div>
		)
	}
}
