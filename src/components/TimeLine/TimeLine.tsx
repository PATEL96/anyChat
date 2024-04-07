import Navbar from "@/components/Navbar/Navbar"
import './page.css'
import { Separator } from "@/components/ui/separator"
import { Button } from "../ui/button"
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons"

async function getComments() {
	try {
		const res = await fetch('http://192.168.0.103:3000/api/comments', {
		// const res = await fetch('http://192.168.0.102:3000/api/comments', {
		// const res = await fetch('http://localhost:3000/api/comments', {
			cache: 'no-store',
		})

		if (!res.ok) {
			throw new Error("Failed to Fetch Data.")
		}

		return res.json();

	} catch (error) {
		console.log(error)
	}
}

function convertTimestampToSimpleDate(timestamp: string): string {
	const date = new Date(timestamp);
	
	const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

	// Calculate the number of hours ago the timestamp was
	const currentTime = new Date();
	const hoursAgo = Math.floor((currentTime.getTime() - date.getTime()) / (1000 * 3600));

	return `${formattedDate} (${hoursAgo} hours ago)`;
}

export async function TimeLine() {

	const comments = await getComments() || [{ comment: "Loading" }];



	return (
		<div className="flex items-center">
			<div className="TimeLine">
				{comments.map((element: any) => (
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
					</div>
				))}
			</div>
			<Navbar />
		</div>
	)
}