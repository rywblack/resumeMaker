
function Resume ({formData, experiences}) {
  

  return (
    <div className="px-8 aspect-[8.5/11] w-full max-w-screen-md mx-auto break-words">
      <div>
        <div className="flex justify-center pb-2">
        <h1 class="text-2xl"><b>{formData.name}</b></h1>
        </div>
        <div className="flex flex-row justify-around gap-8">
          <div>
            <p>{formData.email}</p>
          </div>
          <div>
            <p>{formData.phone}</p>
          </div> 
          <div>
            <p>{formData.linkedIn}</p>
          </div> 
        </div>
      </div>
      <h1 class="pt-4 text-2xl">Education</h1>
      <hr className="w-full"/>
      <div className="flex flex-col p-4 pb-0">
        <div className="flex flex-row justify-between">
          <div>
            <h2><b>{formData.university}</b></h2>
          </div>
          <div>
            <p>{formData.gradDate}</p>
          </div>
        </div>
        <div>
          <p><i>{formData.major}</i></p>
        </div> 
      </div>
      <h1 className="pt-4 text-2xl">Work Experience</h1>
      <hr className="flex flex-col w-full"/>
      {experiences.map(exp => (
        <div className="flex flex-col p-4"> 
          <div className="flex flex-row justify-between ">
            <h2><b>{exp.title}</b></h2>
            <h2>{exp.dates}</h2> 
          </div>
          <div className="flex flex-row justify-between mb-2">           
            <h2><i>{exp.company}</i></h2>
            <h2><i>{exp.location}</i></h2>
          </div>
          <p>{exp.description}</p>
        </div>
        ))}
      <h1 className="pt-2 text-2xl">Technical Skills</h1>
      <hr className="flex flex-col w-full"/>
      <div className="p-4">
        <h2><b>Languages: </b>{formData.langs}</h2>
        <h2><b>Frameworks: </b>{formData.frameworks}</h2>
        <h2><b>Developer Tools: </b>{formData.tools}</h2>
        <h2><b>Libraries </b>{formData.libraries}</h2>
      </div>
    </div>
      );

}

export default Resume;
