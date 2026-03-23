import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getResumesForUser, createResume } from "@/lib/db";
import { defaultFormData } from "@/lib/defaultFormData";

// GET /api/resumes — list all resumes for the authenticated user
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resumes = await getResumesForUser(session.user.id);
  return NextResponse.json(resumes);
}

// POST /api/resumes — create a new resume
export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const title = body.title || "Untitled Resume";
  const formData = body.formData || defaultFormData;

  const resume = await createResume(session.user.id, title, formData);
  return NextResponse.json(resume, { status: 201 });
}
