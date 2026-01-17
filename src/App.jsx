// App.jsx
import { useState } from "react";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import "./App.css";

import ResumeForm from "./components/ResumeForm";
import PDFResume from "./components/PDFResume";

function App() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    linkedIn: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    portfolio: "johndoe.dev",
    university: "University of Example",
    major: "B.S. in Computer Science",
    location: "Anytown, USA",
    gradDate: "May 2025",

    certifications: [
      { id: 1, name: "CompTIA A+", issuer: "CompTIA", date: "2024" },
      {
        id: 2,
        name: "Microsoft Azure Fundamentals (AZ-900)",
        issuer: "Microsoft",
        date: "2024",
      },
    ],

    experiences: [
      {
        id: 1,
        title: "Front-End Developer Intern",
        dates: "Jun 2024 – Aug 2024",
        company: "TechCorp",
        location: "Remote",
        description:
          "Built responsive UIs using React and improved page load speed by 30%.",
      },
    ],
    projects: [
      {
        id: 1,
        title: "Portfolio Website",
        link: "https://johndoe.dev",
        description:
          "A personal website showcasing my projects and skills, built with Next.js.",
      },
    ],
    langs: "JavaScript, TypeScript, Python, C++",
    frameworks: "React, Next.js, Node.js",
    tools: "Git, Docker, Vite, VSCode",
    libraries: "Chakra UI, React-PDF, Framer Motion",
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

        {/* Right Panel: PDF Preview */}
        <div className="hidden md:block md:w-1/2 h-full">
          <SafePDFViewer formData={formData} />
        </div>
      </div>
    </div>
  );
}

export default App;

