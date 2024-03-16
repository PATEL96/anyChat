"use client"

import './Navbar.css';
import { useState } from "react"
import { PlusIcon, Cross2Icon, PersonIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { AddComment } from '../AddComment/AddComment';


export default function Navbar() {

	const [goal, setGoal] = useState(350)
	const { data: session } = useSession();

	function onClick(adjustment: number) {
		setGoal(Math.max(200, Math.min(400, goal + adjustment)))
	}

	return (
		<div className="Navbar">
			<div>
				<Drawer>
					<DrawerTrigger asChild>
						<Button variant='default' className='rounded-full h-12 w-12'>
							<PlusIcon className='h-10 w-10' />
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<div className="mx-auto w-full max-w-sm">
							<DrawerHeader className='flex items-center justify-between'>
								<DrawerTitle>Move Goal</DrawerTitle>
								<DrawerClose asChild>
									<Button variant="outline" size="icon" className=' h-8 w-8 shrink-0 rounded-full'>
										<Cross2Icon className='h-4 w-4' />
									</Button>
								</DrawerClose>
							</DrawerHeader>
							<Dialog>
								<DialogTrigger>Add Comment</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Add a new Comment here...</DialogTitle>
										<DialogDescription>
											<AddComment />
										</DialogDescription>
									</DialogHeader>
								</DialogContent>
							</Dialog>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button variant="outline">Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</div>
					</DrawerContent>
				</Drawer>
			</div>
			<div>
				<Drawer>
					<DrawerTrigger asChild>
						<Button variant='default' className='rounded-full h-12 w-12'>
							<PersonIcon className='h-10 w-10' />
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<div className="mx-auto w-full max-w-sm">
							<DrawerHeader className='flex items-center justify-between'>
								<DrawerTitle>User Settings</DrawerTitle>
								<DrawerClose asChild>
									<Button variant="outline" size="icon" className=' h-8 w-8 shrink-0 rounded-full'>
										<Cross2Icon className='h-4 w-4' />
									</Button>
								</DrawerClose>
							</DrawerHeader>
							<div className="p-4 pb-0">
								<div className="mt-3 h-[120px]">
									{session?.user?.name}
								</div>
							</div>
							<DrawerFooter>
								<Link href="/api/auth/signout">
									<Button variant="destructive" className='w-full'>
										Log Out
									</Button>
								</Link>
							</DrawerFooter>
						</div>
					</DrawerContent>
				</Drawer>
			</div>
		</div>
	);
}