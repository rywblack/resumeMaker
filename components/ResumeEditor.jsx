"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";

import ResumeForm from "./ResumeForm";
import PDFResume from "./PDFResume";
import { defaultFormData } from "../lib/defaultFormData";

export default function ResumeEditor({ initialFormData, resumeId, initialTitle }) {
  const [formData, setFormData] = useState(initialFormData || defaultFormData);
  const [title, setTitle] = useState(initialTitle || "Untitled Resume");
  const [saveStatus, setSaveStatus] = useState("saved"); // "saved" | "saving" | "unsaved"
  const saveTimeoutRef = useRef(null);
  const isAuthenticated = !!resumeId;

  const inputClass =
    "w-full p-2 border border-gray-300 rounded-md outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 mb-2";
  const experienceClass =
    "w-full p-2 border border-gray-300 rounded-md outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 mb-2";
  const buttonClass =
    "bg-gray-800 text-white font-semibold rounded-lg px-4 py-2 hover:bg-gray-900 transition duration-200";

  // Auto-save with debounce
  const saveToServer = useCallback(async (currentFormData, currentTitle) => {
    if (!resumeId) return;

    setSaveStatus("saving");
    try {
      await fetch(`/api/resumes/${resumeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: currentTitle, formData: currentFormData }),
      });
      setSaveStatus("saved");
    } catch (error) {
      console.error("Failed to save:", error);
      setSaveStatus("unsaved");
    }
  }, [resumeId]);

  // Debounced auto-save when formData or title changes
  useEffect(() => {
    if (!isAuthenticated) return;

    setSaveStatus("unsaved");

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveToServer(formData, title);
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData, title, isAuthenticated, saveToServer]);

  const downloadPDF = async () => {
    try {
      const blob = await pdf(<PDFResume formData={formData} />).toBlob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${formData.name || "resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation error:", error);
    }
  };

  function SafePDFViewer({ formData }) {
    try {
      return (
        <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
          <PDFResume formData={formData} />
        </PDFViewer>
      );
    } catch (err) {
      console.error("PDF render error", err);
      return <div className="text-red-500 p-4">PDF failed to render.</div>;
    }
  }

  const saveStatusText = {
    saved: "Saved",
    saving: "Saving...",
    unsaved: "Unsaved changes",
  };

  return (
    <div className="h-full flex flex-col">
      {/* Editor Header */}
      <header className="flex items-center justify-between bg-gray-100 shadow px-6 py-3 z-40">
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              &larr; Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none px-1"
            />
          ) : (
            <h1 className="text-2xl font-bold">Resume Maker</h1>
          )}
          {isAuthenticated && (
            <span
              className={`text-xs px-2 py-1 rounded ${
                saveStatus === "saved"
                  ? "bg-green-100 text-green-700"
                  : saveStatus === "saving"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {saveStatusText[saveStatus]}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={() => saveToServer(formData, title)}
              className="border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg px-4 py-2 hover:bg-gray-200 transition duration-200"
            >
              Save
            </button>
          )}
          <button onClick={downloadPDF} className={buttonClass}>
            Download PDF
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Form */}
        <div className="w-full md:w-1/2 overflow-y-auto bg-gray-50 p-6">
          <ResumeForm
            formData={formData}
            setFormData={setFormData}
            inputClass={inputClass}
            experienceClass={experienceClass}
            buttonClass={buttonClass}
          />
        </div>

        {/* Right Panel: PDF Preview */}
        <div className="hidden md:block md:w-1/2 h-full">
          <SafePDFViewer formData={formData} />
        </div>
      </div>
    </div>
  );
}
