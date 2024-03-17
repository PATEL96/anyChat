import Navbar from "@/components/Navbar/Navbar"
import './page.css'
import { Separator } from "@/components/ui/separator"

async function getComments() {
	try {
		const res = await fetch('http://192.168.0.102:3000/api/comments', {
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

export async function TimeLine() {

	const comments = await getComments();

	return (
		<div className="flex items-center">
			<div className="TimeLine">
				{comments.reverse().map((element: any) => (
					<div>
						<div className="Element m-5" key={element.id}>
							<p>{element.comment}</p>
						</div>
						<Separator />
					</div>
				))}
			</div>
			<Navbar />
		</div>
	)
}