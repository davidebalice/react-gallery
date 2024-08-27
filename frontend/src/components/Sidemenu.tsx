import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "./../assets/img/logoWhite.png";

interface MenuProps {
  setType: (type: string) => void;
  openModal: React.MouseEventHandler<HTMLButtonElement>;
}

const adminPanelUrl = process.env.REACT_APP_ADMIN_PANEL_URL;

console.log(adminPanelUrl);

const Sidemenu: React.FC<MenuProps> = ({ setType, openModal }) => {
  const handleChangePage = (page: string) => {
    setType(page);
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className={`sidemenu ${isOpen ? "open" : ""}`}>
        <div className="sidemenu-header">
          <div style={{ textAlign: "left" }}>
            <img src={logo} alt="db logo" className="sidemenu-logo" />
          </div>
          <div>
            <FaTimes className="close-icon" onClick={toggleSidebar} />
          </div>
        </div>
        <br />
        <div
          onClick={() => {
            handleChangePage("Gallery");
          }}
          className="button-sidemenu"
        >
          Gallery
        </div>
        <div
          onClick={() => {
            handleChangePage("Masonry");
          }}
          className="button-sidemenu"
        >
          Masonry
        </div>
        <div
          onClick={() => {
            handleChangePage("Slideshow");
          }}
          className="button-sidemenu"
        >
          Slideshow
        </div>
        <div
          onClick={() => {
            handleChangePage("Gallery3d");
          }}
          className="button-sidemenu"
        >
          3D
        </div>
        <a href={adminPanelUrl} target="_blank" rel="noreferrer">
          <div className="button-sidemenu">Backend</div>
        </a>
        <div onClick={() => openModal} className="button-sidemenu">
          Github
        </div>
      </div>
    </>
  );
};

export default Sidemenu;

/*







<Sidebar isOpen={isOpen}>
<SidebarLink href="#">Home</SidebarLink>
<SidebarLink href="#">About</SidebarLink>
<SidebarLink href="#">Services</SidebarLink>
<SidebarLink href="#">Contact</SidebarLink>
</Sidebar>
</Container>
);
};
*/
