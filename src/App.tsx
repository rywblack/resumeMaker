import { useState } from "react";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import "./App.css";

import ResumeForm from "./components/ResumeForm";
import PDFResume from "./components/PDFResume";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    university: "",
    major: "",
    location: "",
    gradDate: "",
    experiences: [],
    projects: [],
    langs: "",
    frameworks: "",
    tools: "",
    libraries: "",
  });

  const inputClass =
    "w-full p-2 border border-gray-300 rounded-md outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 mb-2";
  const experienceClass =
    "w-full p-2 border border-gray-300 rounded-md outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 mb-2";
  const buttonClass =
    "bg-gray-800 text-white font-semibold rounded-lg px-4 py-2 hover:bg-gray-900 transition duration-200";

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
      console.error("❌ PDF generation error:", error);
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

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between bg-gray-100 shadow px-6 py-3 sticky top-0 z-50">
        <h1 className="text-2xl font-bold">Resume Maker</h1>
        <button onClick={downloadPDF} className={buttonClass}>
          Download PDF
        </button>
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
<SafePDFViewer formData={formData} />

      </div>
    </div>
  );
}

export default App;
