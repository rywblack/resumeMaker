// components/ResumeForm.jsx
import Experience from "./Experience";
import Projects from "./Project";

export default function ResumeForm({
  formData,
  setFormData,
  inputClass,
  experienceClass,
  buttonClass,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ?? "", // 👈 ensures it's always a string
    }));
  };

  // Experience
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: Date.now(),
          title: "",
          dates: "",
          company: "",
          location: "",
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value ?? "" } : exp
      ),
    }));
  };

  const removeExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  // Projects
  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: Date.now(), title: "", link: "", description: "" },
      ],
    }));
  };

  const updateProject = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, [field]: value ?? "" } : p
      ),
    }));
  };

  const removeProject = (id) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  // Certifications
  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...(prev.certifications || []),
        { id: Date.now(), name: "", issuer: "", date: "" },
      ],
    }));
  };

  const updateCertification = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).map((c) =>
        c.id === id ? { ...c, [field]: value ?? "" } : c
      ),
    }));
  };

  const removeCertification = (id) => {
    setFormData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((c) => c.id !== id),
    }));
  };

  return (
    <form>
      <h2 className="text-xl font-bold mt-2 mb-2">Personal Info</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className={inputClass}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className={inputClass}
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className={inputClass}
      />
      <input
        name="linkedIn"
        value={formData.linkedIn}
        onChange={handleChange}
        placeholder="LinkedIn URL"
        className={inputClass}
      />
      <input
        name="github"
        value={formData.github}
        onChange={handleChange}
        placeholder="GitHub URL"
        className={inputClass}
      />
      <input
        name="portfolio"
        value={formData.portfolio}
        onChange={handleChange}
        placeholder="Portfolio URL"
        className={inputClass}
      />

      <h2 className="text-xl font-bold mt-4 mb-2">Education</h2>
      <input
        name="university"
        value={formData.university}
        onChange={handleChange}
        placeholder="University"
        className={inputClass}
      />
      <input
        name="major"
        value={formData.major}
        onChange={handleChange}
        placeholder="Major"
        className={inputClass}
      />
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location (e.g., Coral Gables, FL)"
        className={inputClass}
      />
      <input
        name="gradDate"
        value={formData.gradDate}
        onChange={handleChange}
        placeholder="Graduation Date"
        className={inputClass}
      />

      {/* Certifications (beneath Education) */}
      <h2 className="text-xl font-bold mt-4 mb-2">Certifications</h2>
      <div className="space-y-3">
        {(formData.certifications || []).map((c) => (
          <div
            key={c.id}
            className="border border-gray-200 rounded-lg p-3 bg-white"
          >
            <input
              value={c.name || ""}
              onChange={(e) =>
                updateCertification(c.id, "name", e.target.value)
              }
              placeholder="Certification name (e.g., CompTIA A+)"
              className={experienceClass}
            />
            <input
              value={c.issuer || ""}
              onChange={(e) =>
                updateCertification(c.id, "issuer", e.target.value)
              }
              placeholder="Issuer (e.g., CompTIA)"
              className={experienceClass}
            />
            <input
              value={c.date || ""}
              onChange={(e) =>
                updateCertification(c.id, "date", e.target.value)
              }
              placeholder="Date (e.g., 2024)"
              className={experienceClass}
            />

            <button
              type="button"
              onClick={() => removeCertification(c.id)}
              className={buttonClass}
            >
              Remove Certification
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addCertification}
          className={buttonClass}
        >
          + Add Certification
        </button>
      </div>

      <h2 className="text-xl font-bold mt-4 mb-2">Experience</h2>
      <Experience
        experiences={formData.experiences}
        addExperience={addExperience}
        updateExperience={updateExperience}
        removeExperience={removeExperience}
        experienceClass={experienceClass}
        buttonClass={buttonClass}
      />

      <h2 className="text-xl font-bold mt-4 mb-2">Projects</h2>
      <Projects
        projects={formData.projects}
        addProject={addProject}
        updateProject={updateProject}
        removeProject={removeProject}
        experienceClass={experienceClass}
        buttonClass={buttonClass}
      />

      <h2 className="text-xl font-bold mt-4 mb-2">Skills</h2>
      <input
        name="langs"
        value={formData.langs}
        onChange={handleChange}
        placeholder="Languages"
        className={inputClass}
      />
      <input
        name="frameworks"
        value={formData.frameworks}
        onChange={handleChange}
        placeholder="Frameworks"
        className={inputClass}
      />
      <input
        name="tools"
        value={formData.tools}
        onChange={handleChange}
        placeholder="Tools"
        className={inputClass}
      />
      <input
        name="libraries"
        value={formData.libraries}
        onChange={handleChange}
        placeholder="Libraries"
        className={inputClass}
      />
    </form>
  );
}

