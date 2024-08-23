import React from "react";
import { Button } from "react-bootstrap";

interface MenuProps {
  setType: (type: string) => void;
  openModal: React.MouseEventHandler<HTMLButtonElement>;
}

const adminPanelUrl = process.env.REACT_APP_ADMIN_PANEL_URL;

console.log(adminPanelUrl);

const Menu: React.FC<MenuProps> = ({ setType, openModal }) => {
  const handleChangePage = (page: string) => {
    setType(page);
  };

  return (
    <div className="menu">
      <Button
        onClick={() => {
          handleChangePage("Gallery");
        }}
        className="button"
      >
        Gallery
      </Button>
      <Button
        onClick={() => {
          handleChangePage("Masonry");
        }}
        className="button"
      >
        Masonry
      </Button>
      <Button
        onClick={() => {
          handleChangePage("Slideshow");
        }}
        className="button"
      >
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
