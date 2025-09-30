import SectionHeading from "./SectionHeading.tsx";

function Resume({ formData, experiences }) {
  return (
    <div
      id="resume-content"
      style={{
        width: "794px",
        minHeight: "1123px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        color: "#1f2937"
      }}
      className="mx-auto p-8"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 style={{ fontSize: "1.875rem", fontWeight: "bold" }}>
          {formData.name}
        </h1>
        <div
          className="flex flex-wrap justify-center gap-4 mt-2"
          style={{ fontSize: "0.875rem" }}
        >
          {formData.email && <p>{formData.email}</p>}
          {formData.phone && <p>{formData.phone}</p>}
          {formData.linkedIn && (
            <a href={formData.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
              LinkedIn
            </a>
          )}
          {formData.github && (
            <a href={formData.github} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
              GitHub
            </a>
          )}
          {formData.portfolio && (
            <a href={formData.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Education */}
      <SectionHeading>Education</SectionHeading>
      <div className="flex flex-col p-2 pb-0">
        <div className="flex flex-row justify-between">
          <h2 style={{ fontWeight: "600" }}>{formData.university}</h2>
          <p>{formData.gradDate}</p>
        </div>
        <p style={{ fontStyle: "italic" }}>{formData.major}</p>
      </div>

      {/* Work Experience */}
      {experiences.length > 0 && (
        <>
          <SectionHeading>Work Experience</SectionHeading>
          {experiences.map(exp => (
            <div key={exp.id} className="p-2">
              <div className="flex justify-between">
                <h3 style={{ fontWeight: "600" }}>{exp.title}</h3>
                <p>{exp.dates}</p>
              </div>
              <div
                className="flex justify-between mb-1"
                style={{ fontSize: "0.875rem", fontStyle: "italic" }}
              >
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </>
      )}

      {/* Projects */}
      {formData.projects?.length > 0 && (
        <>
          <SectionHeading>Projects</SectionHeading>
          {formData.projects.map(proj => (
            <div key={proj.id} className="p-2">
              <div className="flex justify-between items-center">
                <h3 style={{ fontWeight: "600" }}>{proj.title}</h3>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#2563eb",
                      textDecoration: "underline",
                      fontSize: "0.875rem"
                    }}
                  >
                    Link
                  </a>
                )}
              </div>
              <p>{proj.description}</p>
            </div>
          ))}
        </>
      )}

      {/* Technical Skills */}
      <SectionHeading>Technical Skills</SectionHeading>
      <div className="p-2">
        <p><b>Languages:</b> {formData.langs}</p>
        <p><b>Frameworks:</b> {formData.frameworks}</p>
        <p><b>Developer Tools:</b> {formData.tools}</p>
        <p><b>Libraries:</b> {formData.libraries}</p>
      </div>
    </div>
  );
}

export default Resume;

