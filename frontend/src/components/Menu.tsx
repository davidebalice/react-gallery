import React from "react";
import { Button } from "react-bootstrap";

interface MenuProps {
  setType: (type: string) => void;
  openModal: React.MouseEventHandler<HTMLButtonElement>;
}

const Menu: React.FC<MenuProps> = ({ setType, openModal }) => {
  const handleGalleryClick = () => {
    setType("Gallery");
  };

  const handleMasonryClick = () => {
    setType("Masonry");
  };

  const handleSlideshowClick = () => {
    setType("Slideshow");
  };

  return (
    <div className="menu">
      <Button onClick={handleGalleryClick} className="button">
        Gallery
      </Button>
      <Button onClick={handleMasonryClick} className="button">
        Masonry
      </Button>
      <Button onClick={handleSlideshowClick} className="button">
        Slideshow
      </Button>
      <a href="http:/localhost:3000" target="_blank" rel="noreferrer">
        <Button className="button">Backend</Button>
      </a>
      <Button onClick={openModal} className="button">
        Github
      </Button>
    </div>
  );
};

export default Menu;
