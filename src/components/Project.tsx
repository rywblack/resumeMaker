export default function Project({ projects, addProject, updateProject, removeProject, experienceClass, buttonClass }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Projects</h2>
      {projects.map(proj => (
        <div key={proj.id} className="flex flex-row gap-5 items-start mb-4">
          <div className="flex flex-col flex-1">
            <input
              value={proj.title}
              onChange={e => updateProject(proj.id, 'title', e.target.value)}
              placeholder="Project title"
              className={experienceClass}
            />
            <input
              value={proj.link}
              onChange={e => updateProject(proj.id, 'link', e.target.value)}
              placeholder="Project link (optional)"
              className={experienceClass}
            />
            <textarea
              value={proj.description}
              onChange={e => updateProject(proj.id, 'description', e.target.value)}
              placeholder="Short description"
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 mb-2"
            />
          </div>
          <button
            type="button"
            className={`${buttonClass} px-2 py-2.5 h-10`}
            onClick={() => removeProject(proj.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className={`${buttonClass} px-2 py-3`}
        onClick={addProject}
      >
        Add Project
      </button>
    </div>
  );
}

