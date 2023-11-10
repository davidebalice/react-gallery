import React, { useState } from "react";
import images from "../data/products";
import Masonry from "react-masonry-css";
import PhotoModal from "./PhotoModal";
import "bootstrap/dist/css/bootstrap.min.css";

const breakpointColumnsObj = {
  default: 5,
};

const MasonryGallery = () => {
  const [selectedImage, setSelectedImage] = useState("");

  const openImage = (photo: string) => {
    setSelectedImage(photo);
  };

  const closeImage = () => {
    setSelectedImage("");
  };

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
              src={image.photo}
              alt={` ${index}`}
              className="masonryImg"
              onClick={() => openImage(image.photo)}
            />
          </div>
        ))}
      </Masonry>
      <PhotoModal selectedImage={selectedImage} closeImage={closeImage} />
    </>
  );
};

export default MasonryGallery;
