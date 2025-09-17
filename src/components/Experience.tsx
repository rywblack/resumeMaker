
export default function Experience({experiences,addExperience,updateExperience,removeExperience, experienceClass, buttonClass}){

  return (
    <div>
      <h2><b>Work Experience</b></h2>
      {experiences.map(exp => (
        <div key={exp.id} className="flex flex-row gap-5 items-center">
          <div className="flex flex-col">
            <input
              value={exp.title}
              onChange={e => updateExperience(exp.id, 'title', e.target.value)}
              placeholder="job title"
              className={experienceClass}
            />
            <input
              value={exp.dates}
              onChange={e => updateExperience(exp.id, 'dates', e.target.value)}
              placeholder="June 2020 - Present"
              className={experienceClass}
            />
            <input
              value={exp.location}
              onChange={e => updateExperience(exp.id, 'location', e.target.value)}
              placeholder="location"
              className={experienceClass}
            />
            <input
              value={exp.company}
              onChange={e => updateExperience(exp.id, 'company', e.target.value)}
              placeholder="company"
              className={experienceClass}
            />
            <textarea
              value={exp.description}
              onChange={e => updateExperience(exp.id, 'description', e.target.value)}
              placeholder="description"
              className=" w-full p-2 border border-gray-400 rounded-md outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 mb-4 "
            />
          </div>
          <button className={buttonClass+'px-2 py-2.5 h-10'} onClick={() => removeExperience(exp.id)}>Remove</button>
        </div>
      ))}
      <button className={buttonClass+"px-2 py-3"} onClick={addExperience}>Add Experience</button>
    </div>
  );
  
}
