import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInButtons from "@/components/SignInButtons";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Resume Maker</h1>
        <p className="text-gray-600 mb-8">
          Build professional resumes and save them to your account. Sign in to
          get started.
        </p>
        <SignInButtons />
      </div>
    </div>
  );
}
