import { useState } from 'react';
import "./App.css";
import ResumeForm from "./components/ResumeForm.tsx";
import Resume from "./components/Resume.tsx";

function App () {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedIn: "",
    university: "",
    gradDate: "",
    experiences: [],
    langs: "",
    frameworks: "",
    tools: "",
    libraries: ""
  });

  const inputClass="p-2 border border-gray-400 rounded-md outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 mb-2 mt-2 mr-2";

  const experienceClass="w-full p-2 border border-gray-400 rounded-md outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 mb-2 mt-2";

  const buttonClass="bg-[#cfcfcf] text-white font-semibold rounded-xl shadow-md hover:bg-[#adadad] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-200 ";

  return (
    <div>
      <div className="flex items-center justify-center h-12 shadow-md bg-[#e3e3e3] sticky top-0 z-50 ">
        <h1>Resume maker</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1 flex items-center justify-center bg-[#e3e3e3] p-4 pt-30 h-screen shadow-xl overflow-y-auto">
          <ResumeForm formData={formData} setFormData={setFormData} inputClass={inputClass}  experienceClass={experienceClass} buttonClass={buttonClass} />
        </div>       
        <div className="flex-1 flex flex-col items-center p-4 h-screen overflow-y-auto">
            <Resume formData={formData} experiences={formData.experiences}/>
        </div>      
      </div>
    </div>
     );

}

export default App;
