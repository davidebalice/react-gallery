import React from "react";
import { Modal, Button } from "react-bootstrap";
import github from "../assets/img/github.png";

interface ModalProps {
  show: boolean;
  close: () => void;
}

const GithubModal: React.FC<ModalProps> = ({ show, close }) => {
  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton className="githubModal"></Modal.Header>
      <Modal.Body className="githubModal">
        <div className="col-6 githubModalCol">
          <img src={github} className="githubLogo" alt="github logo" />
          <p className="githubText1">Backend</p>
          <a
            href="https://github.com/davidebalice/node-gallery-api"
            target="_blank"
            rel="noreferrer"
            className="githubText2"
          >
            github.com/davidebalice/node-gallery-api
          </a>
        </div>
        <div className="col-6 githubModalCol">
          <img
            src={github}
            className="githubLogo"
            alt="github logo"
            style={{ width: "150px !important" }}
          />
          <p className="githubText1">Frontend</p>
          <a
            href="https://github.com/davidebalice/react-gallery"
            target="_blank"
            rel="noreferrer"
            className="githubText2"
          >
            github.com/davidebalice/react-gallery
          </a>
        </div>
      </Modal.Body>
      <Modal.Footer className="githubModal"></Modal.Footer>
    </Modal>
  );
};

export default GithubModal;
