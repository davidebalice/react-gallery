import React, { useState } from "react";
import classes from "./Header.module.css";
import logo from "./../assets/img/logo.png";
import github from "./../assets/img/github2.png";
import Menu from "../components/Menu";
import GithubModal from "../components/GithubModal";

interface MenuProps {
  setType: (type: string) => void;
}

const Header: React.FC<MenuProps> = ({ setType }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <header className={classes.header}>
        <div className="header-area">
          <div className="main-header header-sticky">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className={classes.headerContainer}>
                  <div className={classes.logoContainer}>
                    <img src={logo} alt="db logo" className={classes.logo} />
                  </div>
                  <div className={classes.logoContainer}>
                    <img
                      src={github}
                      alt="db logo"
                      className={classes.github}
                      onClick={openModal}
                    />
                  </div>
                </div>
                <Menu setType={setType} openModal={openModal} />
              </div>
            </div>
          </div>
        </div>
      </header>
      <GithubModal show={showModal} close={closeModal} />
    </>
  );
};

export default Header;
