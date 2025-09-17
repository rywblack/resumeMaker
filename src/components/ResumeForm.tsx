import {useState} from "react";
import Experience from "./Experience.tsx";

function ResumeForm ({setFormData,formData,inputClass,experienceClass, buttonClass}){

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({...prev, experiences: [...prev.experiences,{ id: Date.now(),title:"", location:"", dates:"",company: "", description: ""}]}));
  };

  const updateExperience = (id: number, field: string, value: string) => {
    setFormData(prev => ({...prev, experiences: prev.experiences.map(exp => exp.id === id ? {...exp, [field]: value} : exp)}));
  };

  const removeExperience = (id: number) => {
    setFormData(prev => ({...prev, experiences: prev.experiences.filter(exp => exp.id !== id)}));
  };

  return ( 
    <div>
      <input 
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          className={inputClass}/>
      <input 
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          className={inputClass}/>
      <input 
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone"
          className={inputClass}/>
      <input
          name="linkedIn"
          value={formData.linkedIn}
          onChange={handleChange}
          placeholder="Enter linkedIn"
          className={inputClass}/>
      <input 
          name="university"
          value={formData.university}
          onChange={handleChange}
          placeholder="Enter university"
          className={inputClass}/>
      <input 
          name="gradDate"
          value={formData.gradDate}
          onChange={handleChange}
          placeholder="Enter gradDate"           
          className={inputClass}/>
      <input 
          name="major"
          value={formData.major}
          onChange={handleChange}
          placeholder="Enter major"          
          className={inputClass}/>
      <Experience buttonClass={buttonClass} experienceClass={experienceClass} experiences = {formData.experiences} addExperience = {addExperience} updateExperience = {updateExperience} removeExperience = {removeExperience}/>
      <input name="langs" value={formData.langs} onChange={handleChange} placeholder="Enter languages" className={inputClass}/>
      <input name="frameworks" value={formData.frameworks} onChange={handleChange} placeholder="Enter frameworks" className={inputClass}/>
      <input name="tools" value={formData.tools} onChange={handleChange} placeholder="Enter developer tools" className={inputClass}/>
      <input name="libraries" value={formData.libraries} onChange={handleChange} placeholder="Enter libraries" className={inputClass}/>

    </div>
  );
}

export default ResumeForm;
