import React, { useState, useEffect, useRef } from "react";
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";
import axios from "axios";

const delay = 3500;

const Slideshow = () => {
  const token = localStorage.getItem("authToken");
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  interface ImageData {
    _id: string;
    photo: string;
    name: string;
  }

  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [index]);

  const next = () => {
    setIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/gallery/654e5a9bbbd8b8c664a55983?limit=60`,
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
    <div className="slideshowPage pt-4">
      <div className="slideshow">
        <div className="slideButtons">
          <BsFillArrowLeftSquareFill onClick={prev} className="slideButton" />
          <BsFillArrowRightSquareFill onClick={next} className="slideButton"/>
        </div>

        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {images.map((image, index) => (
            <div className="slide" key={index}>
              <img src={`${process.env.REACT_APP_BACKEND_URL}/api/gallery/photo/${image.photo}`} alt={image.name} className="slideImg" />
            </div>
          ))}
        </div>

        <div className="slideThumbs">
          {images.map((image, id) => (
            <div
              key={id}
              className={`slideThumbWrapper${index === id ? " active" : ""}`}
              onClick={() => {
                setIndex(id);
              }}
            >
              {" "}
              <img src={`${process.env.REACT_APP_BACKEND_URL}/api/gallery/photo/${image.photo}`} alt={image.name} className="slideThumb" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
