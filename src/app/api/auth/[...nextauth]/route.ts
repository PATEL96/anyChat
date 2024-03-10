import NextAuth from "next-auth/next";
import { auhOptions } from "./options";

const handler = NextAuth(auhOptions);

export { handler as GET, handler as POST }