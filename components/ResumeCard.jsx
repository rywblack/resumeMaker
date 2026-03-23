"use client";

import Link from "next/link";

export default function ResumeCard({ resume, onDelete }) {
  const updatedAt = new Date(resume.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-1 truncate">{resume.title}</h3>
      <p className="text-sm text-gray-500 mb-4">Last updated: {updatedAt}</p>

      <div className="flex gap-2">
        <Link
          href={`/editor/${resume.id}`}
          className="bg-gray-800 text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-gray-900 transition duration-200"
        >
          Open
        </Link>
        <button
          onClick={() => onDelete(resume.id)}
          className="border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg px-4 py-2 hover:bg-gray-100 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
