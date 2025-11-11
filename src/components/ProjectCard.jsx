import { useState } from "react";
import { FaChevronRight, FaGithub } from "react-icons/fa";
import Modal from "./Modal";

const ProjectCard = ({ project }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const doc = project.documentationContent;

  return (
    <>
      <div className="card">
        <div className="card-content">
          <h3>{project.title}</h3>
          <p>{project.description.line1}</p>
          <ul>
            {project.description.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="card-links">
          <a href={project.linkUrl} target="_blank" rel="noopener noreferrer">
            {project.link} <FaChevronRight />
          </a>
          <button className="doc-button" onClick={() => setModalOpen(true)}>
            {project.documentation} <FaChevronRight />
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="doc-modal-content">
          <div className="architecture-section">
            <h3>{doc.title}</h3>
            <p>{doc.architecture}</p>
          </div>
          <div className="tech-columns">
            <div className="tech-column">
              <h4>Frontend:</h4>
              <ul>
                {doc.frontend.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
            <div className="tech-column">
              <h4>Backend:</h4>
              <ul>
                {doc.backend.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>
          {doc.integration && (
            <>
              <h4>Integración:</h4>
              <p>{doc.integration}</p>
            </>
          )}
          <div className="repo-link-container">
            <a href={doc.repoLink} target="_blank" rel="noopener noreferrer">
              <span className="repo-text">{doc.repoText}</span>
              <FaGithub className="repo-icon" />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProjectCard;
