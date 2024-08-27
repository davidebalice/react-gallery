import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import spinner from "../assets/img/spinner.svg";
import Categories from "./Categories";
import PhotoModal from "./PhotoModal";

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
  const [selectedCategory, setSelectedCategory] = useState(
    "654e5a95bbd8b8c664a55978"
  );

  const openImage = (photo: string) => {
    setSelectedImage(photo);
  };

  const closeImage = () => {
    setSelectedImage("");
  };

  const fetchImages = (page: number) => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/images/${selectedCategory}?limit=12&page=${page}`,
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
  }, [currentPage, selectedCategory]);

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

  interface CategoriesProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
  }

  return (
    <>
      <Container fluid className="mt-0">
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Row>
          {loading && (
            <div className="spinner">
              <img src={spinner} alt="spinner" />
            </div>
          )}
          {!loading &&
            images &&
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
            <div
              onClick={handlePreviousPage}
              className={`button-paging ${currentPage === 1 ? "disabled" : ""}`}
            >
              {"<<"}
            </div>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <div
              onClick={handleNextPage}
              className={`button-paging ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              {">>"}
            </div>
          </div>
        )}
      </Container>
      <PhotoModal selectedImage={selectedImage} closeImage={closeImage} />
    </>
  );
};

export default Gallery;
