import React, { useState } from "react";
import images from "../data/cities";
import PhotoModal from "./PhotoModal";
import { Container, Card, Row, Col } from "react-bootstrap";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState("");

  const openImage = (photo: string) => {
    setSelectedImage(photo);
  };

  const closeImage = () => {
    setSelectedImage("");
  };

  return (
    <>
      <Container fluid className="mt-4">
        <Row>
          {images.map((image, index) => (
            <Col key={index} md={3} className="col">
              <div className="imageContainer">
                <img
                  src={image.photo}
                  alt={`${index}`}
                  className="galleryImg"
                  onClick={() => openImage(image.photo)}
                />
                <div className="galleryInfo">{image.name}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <PhotoModal selectedImage={selectedImage} closeImage={closeImage} />
    </>
  );
};

export default Gallery;
