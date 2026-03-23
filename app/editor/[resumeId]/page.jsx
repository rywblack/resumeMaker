import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { getResumeById } from "@/lib/db";
import Navbar from "@/components/Navbar";
import ResumeEditorLoader from "@/components/ResumeEditorLoader";

export default async function EditorPage({ params }) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const { resumeId } = await params;
  const resume = await getResumeById(resumeId, session.user.id);

  if (!resume) {
    notFound();
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <ResumeEditorLoader
          initialFormData={resume.form_data}
          resumeId={resume.id}
          initialTitle={resume.title}
        />
      </div>
    </div>
  );
}
