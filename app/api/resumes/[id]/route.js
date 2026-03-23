import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getResumeById, updateResume, deleteResume } from "@/lib/db";

// GET /api/resumes/:id — get a single resume
export async function GET(request, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const resume = await getResumeById(id, session.user.id);

  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(resume);
}

// PUT /api/resumes/:id — update a resume
export async function PUT(request, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const resume = await updateResume(
    id,
    session.user.id,
    body.title,
    body.formData
  );

  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(resume);
}

// DELETE /api/resumes/:id — delete a resume
export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteResume(id, session.user.id);

  return NextResponse.json({ success: true });
}
