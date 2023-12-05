import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import PhotoModal from "./PhotoModal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const breakpointColumnsObj = {
  default: 5,
};

const MasonryGallery = () => {
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
        `${process.env.REACT_APP_API_BASE_URL}/api/images/654e5aa0bbd8b8c664a5598e?limit=60`,
        {
          headers: {
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
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonryGrid mt-4"
        columnClassName="masonryColumn"
      >
        {images.map((image, index) => (
          <div key={index} className="masonryGridItem">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/api/gallery/photo/${image.photo}`}
              alt={` ${index}`}
              className="masonryImg"
              onClick={() => openImage(`${process.env.REACT_APP_BACKEND_URL}/api/gallery/photo/${image.photo}`)}
            />
          </div>
        ))}
      </Masonry>
      <PhotoModal selectedImage={selectedImage} closeImage={closeImage} />
    </>
  );
};

export default MasonryGallery;
