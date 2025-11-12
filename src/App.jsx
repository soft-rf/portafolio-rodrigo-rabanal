import { useState } from "react";
import "./App.css";
import contentEs from "./data/content_es.json";
import contentEn from "./data/content_en.json";
import profilePic from "./assets/foto-rodrigo2.png";
import ProjectCard from "./components/ProjectCard";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaEye,
  FaCopy,
} from "react-icons/fa";

const content = {
  es: contentEs,
  en: contentEn,
};

// Helper to highlight skills
const HighlightedSkill = ({ text }) => {
  const highlights = {
    React: "highlight-react",
    "Node.js": "highlight-node",
    "Express.js": "highlight-express",
    Playwright: "highlight-playwright",
    Postman: "highlight-postman",
    Jenkins: "highlight-jenkins",
    "GitHub Actions": "highlight-github",
  };

  const regex = new RegExp(`(${Object.keys(highlights).join("|")})`, "g");

  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        highlights[part] ? (
          <span key={i} className={highlights[part]}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

function App() {
  const [language, setLanguage] = useState("es");
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const c = content[language];

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "es" ? "en" : "es"));
  };

  const handleProfileClick = () => {
    console.log("Opening video modal");
    setVideoModalOpen(true);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>{c.header.profile}</h1>
        <nav className="header-nav">
          <a href="#contact" aria-label="Contact">
            <FaEnvelope />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <button onClick={toggleLanguage} className="lang-switcher">
            {language === "es" ? "EN" : "ES"}
          </button>
        </nav>
      </header>

      <main>
        <div className="profile-mission-container">
          <section className="profile">
            <div className="profile-pic-container" onClick={handleProfileClick}>
              <img
                src={profilePic}
                className="profile-pic"
                alt="Rodrigo Rabanal Fernández"
              />
              <div className="profile-pic-overlay">
                <FaEye className="eye-icon" />
              </div>
            </div>
            <div className="profile-info">
              <h2>{c.personal.name}</h2>
              <h3>{c.personal.role}</h3>
              <p>
                {c.personal.bio.map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < c.personal.bio.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </section>

          <section className="mission">
            <blockquote>{c.mission.text}</blockquote>
          </section>
        </div>

        <section id="projects" className="projects">
          <h2>{c.projects.title}</h2>
          <p className="subtitle">{c.projects.subtitle}</p>
          <div className="project-cards">
            <ProjectCard
              project={{
                ...c.projects.ecommerce,
                linkUrl: "https://somosbaristas.com",
              }}
            />
            <ProjectCard
              project={{
                ...c.projects.duroPisos,
                linkUrl: "https://rodrigofernandezqa.github.io/duropisos/",
              }}
            />
          </div>
        </section>

        <section id="skills" className="skills">
          <h2>{c.skills.title}</h2>
          <p className="subtitle">{c.skills.subtitle}</p>
          <div className="skills-container">
            <div className="skills-list">
              <h3>{c.skills.technicalTitle}</h3>
              <ul>
                {c.skills.technical.map((skill, index) => (
                  <li key={index}>
                    <HighlightedSkill text={skill} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="soft-skills-list">
              <h3>{c.skills.soft.title}</h3>
              <ul>
                {c.skills.soft.list.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <h2>{c.contact.title}</h2>
        <div className="copyable-item">
          <span>{c.contact.email}</span>
          <button
            onClick={() => handleCopy(c.contact.email)}
            className="copy-button"
            aria-label="Copiar email"
          >
            <FaCopy />
          </button>
        </div>
      </footer>

      {isVideoModalOpen && (
        <div className="modal-overlay" onClick={() => setVideoModalOpen(false)}>
          <div
            className="modal-content video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setVideoModalOpen(false)}
            >
              &times;
            </button>
            <h3>{c.videoModal.title}</h3>
            <div className="video-placeholder">
              {/* Aquí irá tu componente de video en el futuro */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
