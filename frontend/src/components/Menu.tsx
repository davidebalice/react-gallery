import React from "react";

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
      <div
        onClick={() => {
          handleChangePage("Gallery");
        }}
        className="button"
      >
        Gallery
      </div>
      <div
        onClick={() => {
          handleChangePage("Masonry");
        }}
        className="button"
      >
        Masonry
      </div>
      <div
        onClick={() => {
          handleChangePage("Slideshow");
        }}
        className="button"
      >
        Slideshow
      </div>
      <div
        onClick={() => {
          handleChangePage("3D");
        }}
        className="button"
      >
        3D
      </div>
      <a href={adminPanelUrl} target="_blank" rel="noreferrer">
        <div className="button">Backend</div>
      </a>
      <div onClick={()=>openModal} className="button">
        Github
      </div>
    </div>
  );
};

export default Menu;
