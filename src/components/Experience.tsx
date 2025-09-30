interface ExperienceItem {
  id: number;
  title: string;
  dates: string;
  location: string;
  company: string;
  description: string;
}

interface Props {
  experiences: ExperienceItem[];
  addExperience: () => void;
  updateExperience: (id: number, field: string, value: string) => void;
  removeExperience: (id: number) => void;
  experienceClass: string;
  buttonClass: string;
}

export default function Experience({
  experiences,
  addExperience,
  updateExperience,
  removeExperience,
  experienceClass,
  buttonClass
}: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
      <div className="space-y-4">
        {experiences.map(exp => (
          <div
            key={exp.id}
            className="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={exp.title}
                onChange={e => updateExperience(exp.id, "title", e.target.value)}
                placeholder="Job Title"
                className={experienceClass}
              />
              <input
                type="text"
                value={exp.dates}
                onChange={e => updateExperience(exp.id, "dates", e.target.value)}
                placeholder="Dates (e.g. June 2020 - Present)"
                className={experienceClass}
              />
              <input
                type="text"
                value={exp.company}
                onChange={e => updateExperience(exp.id, "company", e.target.value)}
                placeholder="Company"
                className={experienceClass}
              />
              <input
                type="text"
                value={exp.location}
                onChange={e => updateExperience(exp.id, "location", e.target.value)}
                placeholder="Location"
                className={experienceClass}
              />
            </div>
            <textarea
              value={exp.description}
              onChange={e => updateExperience(exp.id, "description", e.target.value)}
              placeholder="Description / responsibilities"
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 mb-2"
            />
            <div className="flex justify-end">
              <button
                type="button" // 👈 prevents accidental form submission
                className={`${buttonClass} px-3 py-1.5 text-sm`}
                onClick={() => removeExperience(exp.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <button
          type="button" // 👈 key fix here
          className={`${buttonClass} px-4 py-2 text-sm`}
          onClick={addExperience}
        >
          Add Experience
        </button>
      </div>
    </div>
  );
}

