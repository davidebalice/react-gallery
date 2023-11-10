import React from "react";
import classes from "./Header.module.css";
import logo from "./../assets/img/logo.png";
import github from "./../assets/img/github2.png";
import Menu from "../components/Menu";

interface MenuProps {
  setType: (type: string) => void;
}

const Header: React.FC<MenuProps> = ({ setType }) => {
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
                    <a
                      href="https://github.com/davidebalice/react-gallery"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={github} alt="db logo" className={classes.github} />
                    </a>
                  </div>
                </div>
                <Menu setType={setType} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
