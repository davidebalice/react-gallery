import React from "react";
import classes from "./Header.module.css";

const Footer: React.FC = () => {
  return (
    <>
      <footer className={classes.footer}>
        <div className="container-fluid">
          Davide Balice -{" "}
          <a
            href="https://www.davidebalice.dev"
            target="_blank"
            rel="noreferrer"
            className={classes.footerLink}
          >
              www.davidebalice.dev
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
