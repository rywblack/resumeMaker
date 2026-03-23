import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import "./globals.css";

export const metadata = {
  title: "Resume Maker",
  description: "Build and download professional resumes",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cantarell:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
