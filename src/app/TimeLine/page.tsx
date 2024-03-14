'use client'
import Navbar from "@/components/Navbar/Navbar"
import './page.css'
import { TestData } from "./Defaultelements"
import { timeLineElement } from "@/Types"

export function TimeLine() {

	return (
		<div className="flex items-center">
			<div className="TimeLine text-center">
				{TestData.map(element => (
					<div className="Element bg-slate-400 m-10">{element.Data}</div>
				))}
			</div>
			<Navbar />
		</div>
	)
}