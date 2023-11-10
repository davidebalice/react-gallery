import React, { useState, useEffect, useRef } from "react";
import images from "../data/landscapes";
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";

const delay = 3500;

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

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
              <img src={image.photo} alt={image.name} className="slideImg" />
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
              <img src={image.photo} alt={image.name} className="slideThumb" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
