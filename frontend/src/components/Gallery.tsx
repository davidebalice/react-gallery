import React, { useState, useEffect } from "react";
import PhotoModal from "./PhotoModal";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const Gallery = () => {
  const token = localStorage.getItem("authToken");
  const [selectedImage, setSelectedImage] = useState("");
  interface ImageData {
    _id: string;
    photo: string;
    name: string;
  }

  const [images, setImages] = useState<ImageData[]>([]);

  const openImage = (photo: string) => {
    setSelectedImage(photo);
  };

  const closeImage = () => {
    setSelectedImage("");
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/gallery/654e5a95bbd8b8c664a55978?limit=60`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("response.data.gallery");
        console.log(response.data.gallery);
        setImages(response.data.gallery);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, []);

  return (
    <>
      <Container fluid className="mt-4">
        <Row>
          {images &&
            images.map((image: ImageData, index: number) => (
              <Col key={index} md={3} className="col">
                <div className="imageContainer">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/api/gallery/photo/${image.photo}`}
                    alt={`${index}`}
                    className="galleryImg"
                    onClick={() => openImage(`${process.env.REACT_APP_BACKEND_URL}/api/gallery/photo/${image.photo}`)}
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
