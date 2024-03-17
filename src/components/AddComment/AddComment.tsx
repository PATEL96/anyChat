"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
	comment: z
		.string()
		.min(1, {
			message: "Bio must be at least 10 characters.",
		})
		.max(256, {
			message: "Bio must not be longer than 30 characters.",
		}),
})

export function AddComment() {

	const router = useRouter();

	const [submitted, setSubmitted] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	async function onSubmit(comment: z.infer<typeof FormSchema>) {
		console.log(JSON.stringify(comment, null, 2))

		try {
			const res = await fetch('http://192.168.0.102:3000/api/comments', {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify(comment, null, 2)
			})

			if (res.ok) {
				setSubmitted(true);
			} else {
				throw new Error("Failed to Create")
			}

		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-100 space-y-6">
				<FormField
					control={form.control}
					name="comment"
					render={({ field }) => (
						<FormItem>
							<FormLabel></FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us a little bit about yourself"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{
					submitted ?
						<DialogClose asChild>
							<Button className="w-full" variant="outline" onClick={() => {router.refresh()}}>Close</Button>
						</DialogClose>
						:
						<Button type="submit" className="w-full">Post</Button>
				}
			</form>
		</Form>
	)
}
