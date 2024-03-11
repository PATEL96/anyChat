'use client'
import Navbar from "@/components/Navbar/Navbar"
import './page.css'


export function TimeLine() {
	return (
		<div className="flex items-center">
			<div className="TimeLine text-center">
				<>
					Fetch Time Line dat from Server && Backend
				</>
			</div>
			<Navbar />
		</div>
	)
}