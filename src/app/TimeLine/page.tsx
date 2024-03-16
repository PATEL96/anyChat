'use client'
import Navbar from "@/components/Navbar/Navbar"
import './page.css'
import { TestData } from "./Defaultelements"
import { timeLineElement } from "@/Types"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"


export function TimeLine() {

	return (
		<div className="flex items-center">
			<div className="TimeLine">
				{TestData.map(element => (
					<>
						<div className="Element m-5" key={element.id}>
							<p>{element.Data}</p>
						</div>
						<hr></hr>
					</>
				))}
			</div>
			<Navbar />
		</div>
	)
}