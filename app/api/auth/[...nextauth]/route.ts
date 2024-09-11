import NextAuth from "next-auth";
import { authOptions } from "./option";

// The actual handler for NextAuth
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST methods
export { handler as GET, handler as POST };
