import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getResumesForUser } from "@/lib/db";
import Navbar from "@/components/Navbar";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const resumes = await getResumesForUser(session.user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Your Resumes</h2>
        </div>
        <DashboardClient initialResumes={resumes} />
      </main>
    </div>
  );
}
