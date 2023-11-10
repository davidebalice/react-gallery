import React from "react";
import { Button } from "react-bootstrap";

interface MenuProps {
  setType: (type: string) => void;
}

const Menu: React.FC<MenuProps> = ({ setType }) => {
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
      <Button onClick={handleGalleryClick} className="button">Gallery</Button>
      <Button onClick={handleMasonryClick} className="button">Masonry</Button>
      <Button onClick={handleSlideshowClick} className="button">Slideshow</Button>
    </div>
  );
};

export default Menu;
