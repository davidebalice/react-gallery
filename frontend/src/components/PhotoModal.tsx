import React from "react";
import { Modal } from "react-bootstrap";
import { FaWindowClose } from "react-icons/fa";

interface PhotoProps {
  selectedImage: string;
  closeImage: () => void;
}

const PhotoModal: React.FC<PhotoProps> = ({ selectedImage, closeImage }) => {
  return (
    <Modal show={selectedImage !== ""} onHide={closeImage} centered>
      <div className="closeButton" onClick={closeImage}>
        <FaWindowClose size="40" />
      </div>
      <img src={selectedImage} alt={`${selectedImage}`} className="modalPhoto"/>
    </Modal>
  );
};

export default PhotoModal;
