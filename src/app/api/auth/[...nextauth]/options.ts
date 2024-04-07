import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import type { NextAuthOptions } from "next-auth";

export const auhOptions: NextAuthOptions = {
	providers: [
		// Credentials({
		// 	name: "AnyChat",
		// 	credentials: {
		// 		userName: {
		// 			label: "UserName",
		// 			type: "text",
		// 			placeholder: "UserName",
		// 		},
		// 		userPassword: {
		// 			label: "Password",
		// 			type: "password",
		// 			placeholder: "Password"
		// 		},
		// 	},
		// 	async authorize(credentials) {
		// 		const user = { id: "96", name: "PATEL96", password: "rajvandan" }

		// 		if (credentials?.userName === user.name && credentials?.userPassword === user.password) {
		// 			return user;
		// 		} else {
		// 			return null;
		// 		}
		// 	},
		// }),
		Google({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
		Github({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITUB_SECRET as string
		}),
		Discord({
			clientId: process.env.DISCORD_ID as string,
			clientSecret: process.env.DISCORD_SECRET as string
		})
	],
}