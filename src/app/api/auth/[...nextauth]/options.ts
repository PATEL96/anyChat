import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const auhOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "AnyChat",
			credentials: {
				userName: {
					label: "UserName",
					type: "text",
					placeholder: "UserName",
				},
				userPassword: {
					label: "Password",
					type: "password",
					placeholder: "Password"
				},
			},
			async authorize(credentials) {
				const user = { id: "96", name: "PATEL96", password: "rajvandan" }

				if (credentials?.userName === user.name && credentials?.userPassword === user.password) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
}