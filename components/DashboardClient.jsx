"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ResumeCard from "./ResumeCard";

export default function DashboardClient({ initialResumes }) {
  const [resumes, setResumes] = useState(initialResumes);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const buttonClass =
    "bg-gray-800 text-white font-semibold rounded-lg px-4 py-2 hover:bg-gray-900 transition duration-200";

  const createResume = async () => {
    setCreating(true);
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Untitled Resume" }),
      });
      const newResume = await res.json();
      router.push(`/editor/${newResume.id}`);
    } catch (error) {
      console.error("Failed to create resume:", error);
      setCreating(false);
    }
  };

  const deleteResume = async (id) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Failed to delete resume:", error);
    }
  };

  return (
    <>
      <button
        onClick={createResume}
        disabled={creating}
        className={`${buttonClass} mb-6`}
      >
        {creating ? "Creating..." : "+ New Resume"}
      </button>

      {resumes.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No resumes yet. Create your first one!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onDelete={deleteResume}
            />
          ))}
        </div>
      )}
    </>
  );
}
