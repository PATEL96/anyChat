import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import type { NextAuthOptions } from "next-auth";

export const auhOptions: NextAuthOptions = {
	providers: [
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