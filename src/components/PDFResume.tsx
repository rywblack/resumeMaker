import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register local TTFs you downloaded into /public/fonts
Font.register({
  family: "Cantarell",
  fonts: [
    { src: "/fonts/Cantarell-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/Cantarell-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Cantarell-Italic.ttf", fontStyle: "italic", fontWeight: "normal" },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Cantarell",
    fontSize: 11,
    paddingTop: 32,
    paddingHorizontal: 40,
    lineHeight: 1.4,
    flexDirection: "column",
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  contactItem: {
    marginRight: 12,
    marginBottom: 4,
  },
  section: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  eduRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  expItem: {
    marginBottom: 8,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  projectLink: {
    textDecoration: "underline",
  },
});

const normalizeUrl = (url: string) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return "https://" + url;
};

type Experience = {
  id: number | string;
  title: string;
  dates: string;
  company: string;
  location: string;
  description: string;
};

type Project = {
  id: number | string;
  title: string;
  link?: string;
  description: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  university: string;
  major: string;
  location: string;
  gradDate: string;
  experiences: Experience[];
  projects: Project[];
  langs: string;
  frameworks: string;
  tools: string;
  libraries: string;
};

export default function PDFResume({ formData }: { formData: Partial<FormData> }) {
  // 🧠 Step 1: Normalize all fields to avoid undefined
  const safeData: FormData = {
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
    ...(formData || {}),
  };

  const {
    name,
    email,
    phone,
    linkedIn,
    github,
    portfolio,
    university,
    major,
    location,
    gradDate,
    experiences,
    projects,
    langs,
    frameworks,
    tools,
    libraries,
  } = safeData;

  const exps = Array.isArray(experiences) ? experiences.filter(Boolean) : [];
  const projs = Array.isArray(projects) ? projects.filter(Boolean) : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Name */}
        {name ? <Text style={styles.name}>{String(name)}</Text> : null}

        {/* Contact */}
        <View style={styles.contactRow}>
          {email ? <Text style={styles.contactItem}>{String(email)}</Text> : null}
          {phone ? <Text style={styles.contactItem}>{String(phone)}</Text> : null}
          {linkedIn ? (
            <Link src={normalizeUrl(String(linkedIn))} style={styles.contactItem}>
              LinkedIn
            </Link>
          ) : null}
          {github ? (
            <Link src={normalizeUrl(String(github))} style={styles.contactItem}>
              GitHub
            </Link>
          ) : null}
          {portfolio ? (
            <Link src={normalizeUrl(String(portfolio))} style={styles.contactItem}>
              Portfolio
            </Link>
          ) : null}
        </View>

        {/* Education */}
        {(university || gradDate || location || major) && (
          <View style={styles.section}>
            <Text style={styles.heading}>Education</Text>
            <View style={styles.eduRow}>
              <Text style={styles.bold}>{String(university)}</Text>
              <Text>{String(gradDate)}</Text>
            </View>
            <View style={styles.eduRow}>
              <Text style={styles.italic}>{String(major)}</Text>
              <Text style={styles.italic}>{String(location)}</Text>
            </View>
          </View>
        )}

        {/* Experience */}
        {exps.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Work Experience</Text>
            {exps.map((exp) => (
              exp ? (
                <View key={String(exp.id)} style={styles.expItem}>
                  <View style={styles.expHeader}>
                    <Text style={styles.bold}>{String(exp.title)}</Text>
                    <Text>{String(exp.dates)}</Text>
                  </View>
                  <View style={styles.expHeader}>
                    <Text style={styles.italic}>{String(exp.company)}</Text>
                    <Text style={styles.italic}>{String(exp.location)}</Text>
                  </View>
                  {exp.description ? <Text>{String(exp.description)}</Text> : null}
                </View>
              ) : null
            ))}
          </View>
        )}

        {/* Projects */}
        {projs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Projects</Text>
            {projs.map((p) => (
              p ? (
                <View key={String(p.id)} style={styles.expItem}>
                  <View style={styles.expHeader}>
                    <Text style={styles.bold}>{String(p.title)}</Text>
                    {p.link ? (
                      <Link src={normalizeUrl(String(p.link))} style={styles.projectLink}>
                        {String(p.link)}
                      </Link>
                    ) : null}
                  </View>
                  {p.description ? <Text>{String(p.description)}</Text> : null}
                </View>
              ) : null
            ))}
          </View>
        )}

        {/* Skills */}
        {(langs || frameworks || tools || libraries) && (
          <View style={styles.section}>
            <Text style={styles.heading}>Technical Skills</Text>
            {langs ? <Text><Text style={styles.bold}>Languages: </Text>{String(langs)}</Text> : null}
            {frameworks ? <Text><Text style={styles.bold}>Frameworks: </Text>{String(frameworks)}</Text> : null}
            {tools ? <Text><Text style={styles.bold}>Tools: </Text>{String(tools)}</Text> : null}
            {libraries ? <Text><Text style={styles.bold}>Libraries: </Text>{String(libraries)}</Text> : null}
          </View>
        )}
      </Page>
    </Document>
  );
}

