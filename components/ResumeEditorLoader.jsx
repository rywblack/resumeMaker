"use client";

import dynamic from "next/dynamic";

const ResumeEditor = dynamic(() => import("./ResumeEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center">
      <p className="text-gray-500 text-lg">Loading editor...</p>
    </div>
  ),
});

export default function ResumeEditorLoader({
  initialFormData,
  resumeId,
  initialTitle,
}) {
  return (
    <ResumeEditor
      initialFormData={initialFormData}
      resumeId={resumeId}
      initialTitle={initialTitle}
    />
  );
}
