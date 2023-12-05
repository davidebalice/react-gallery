import React from "react";
import { Button } from "react-bootstrap";

interface MenuProps {
  setType: (type: string) => void;
  openModal: React.MouseEventHandler<HTMLButtonElement>;
}

const adminPanelUrl = process.env.REACT_APP_ADMIN_PANEL_URL;

console.log(adminPanelUrl);

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
      <a href={adminPanelUrl} target="_blank" rel="noreferrer">
        <Button className="button">Backend</Button>
      </a>
      <Button onClick={openModal} className="button">
        Github
      </Button>
    </div>
  );
};

export default Menu;
