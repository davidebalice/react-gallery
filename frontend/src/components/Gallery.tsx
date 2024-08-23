import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import PhotoModal from "./PhotoModal";
import spinner from "../assets/img/spinner.svg";

const Gallery = () => {
  interface ImageData {
    _id: string;
    photo: string;
    name: string;
  }
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const openImage = (photo: string) => {
    setSelectedImage(photo);
  };

  const closeImage = () => {
    setSelectedImage("");
  };

  const fetchImages = (page: number) => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/images/654e5a95bbd8b8c664a55978?limit=12&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setImages(response.data.gallery);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error during API call:", error);
      });
  };

  useEffect(() => {
    fetchImages(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Container fluid className="mt-4">
        <Row>
          {loading && (<div className="spinner"><img src={spinner} alt="spinner"/></div>)}
          {!loading && images &&
            images.map((image: ImageData, index: number) => (
              <Col key={index} xs={12} sm={6} md={3} className="col">
                <div className="imageContainer">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/api/images/thumb/${image.photo}`}
                    alt={`${index}`}
                    className="galleryImg"
                    onClick={() =>
                      openImage(
                        `${process.env.REACT_APP_BACKEND_URL}/api/images/photo/${image.photo}`
                      )
                    }
                  />
                  <div className="galleryInfo">{image.name}</div>
                </div>
              </Col>
            ))}
        </Row>
        {!loading && images && (
          <div className="pagination">
            <Button
              variant="primary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              {"<<"}
            </Button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {">>"}
            </Button>
          </div>
        )}
      </Container>
      <PhotoModal selectedImage={selectedImage} closeImage={closeImage} />
    </>
  );
};

export default Gallery;
