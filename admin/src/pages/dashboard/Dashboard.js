import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/UserContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faListCheck,
  faEyeLowVision,
  faBuildingColumns,
  faTableList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import "../../App.css";
import react_node from "../../assets/img/react_node.png";
import react from "../../assets/img/react.jpg";
import node from "../../assets/img/node.jpg";
import github from "../../assets/img/github.png";
import db from "../../assets/img/logo.png";

export default function Hero() {
  const token = localStorage.getItem("authToken");
  const { userData, demo } = useContext(Context);
  const [data, setData] = useState({
    gallery: 0,
    users: 0,
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);

        Swal.fire("Error", error, "error");
      });
  }, []);

  return (
    <>
      <div className="page">
        <div className="row justify-content-between">
          <div
            className="col d-flex align-items-center"
            style={{ whiteSpace: "nowrap" }}
          >
            <span className="text-xl" style={{ fontSize: "150%" }}>
              {" "}
            </span>
          </div>
        </div>

        <div className="accordion mb-3">
          <h2 className="accordion-header">
            <button className="dashboardBar" type="button">
              <h3 className="">Dashboard</h3>
            </button>
          </h2>

          <div className="accordion-item">
            <div className="accordion-collapse col-12 collapse show">
              <div className="dashboardSection">
                <div className="card-body">
                  <div className="row">
                    <div className="dashboardCol col-md-3 col-12">
                      <div className="dashboardDescription">
                        <b className="dashboardText1">Gallery</b>
                        <p className="dashboardText2">
                          Gallery developed in Node and React.
                        </p>

                        <img
                          src={react_node}
                          className="dashboardLogo"
                          alt="dashboard logo"
                        />
                      </div>
                    </div>

                    <div className="dashboardCol col-md-3 col-12">
                      <div className="dashboardDescription ">
                        <img src={db} className="dbLogo" alt="db logo" />
                        <br />
                        <b className="dashboardText3">Important</b>
                        <p className="dashboardText4">
                          App is in <b>DEMO Mode</b>
                          <br />
                          CRUD operations are not allowed!
                        </p>
                      </div>
                    </div>

                    <div className="dashboardCol col-md-3 col-12">
                      <div className="dashboardDescription">
                        <div className="githubContainer">
                          <img
                            src={github}
                            className="dashboardLogo2"
                            alt="dashboard logo"
                          />
                          <img
                            src={react}
                            className="dashboardLogo2"
                            alt="dashboard logo"
                          />
                        </div>
                        <p className="githubTitle">Frontend</p>
                        <a
                          href="https://github.com/davidebalice/react-gallery"
                          target="_blank"
                          className="githubLink"
                          rel="noreferrer"
                        >
                          github.com/davidebalice/react-gallery
                        </a>
                      </div>
                    </div>

                    <div className="dashboardCol col-md-3 col-12">
                      <div className="dashboardDescription">
                        <div className="githubContainer">
                          <img
                            src={github}
                            className="dashboardLogo2"
                            alt="dashboard logo"
                          />
                          <img
                            src={node}
                            className="dashboardLogo2"
                            alt="dashboard logo"
                          />
                        </div>
                        <p className="githubTitle">Backend</p>
                        <a
                          href="https://github.com/davidebalice/node-gallery-api"
                          target="_blank"
                          className="githubLink"
                          rel="noreferrer"
                        >
                          github.com/davidebalice/node-gallery-api
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

     
          <div className="col-lg-3 col-sm-6 col-12 d-flex">
            <div className="dashboardBox">
              <div className="dash-counts">
                <h4>
                  <CountUp end={data && data.gallery} />
                </h4>
                <h5 className="dashboardTitle">Photo</h5>
              </div>
              <div className="dash-imgs">
                <FontAwesomeIcon
                  icon={faListCheck}
                  size="lg"
                  className="dashboardIcon"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12 d-flex">
            <div className="dashboardBox">
              <div className="dash-counts">
                <h4>
                  <CountUp end={data && data.users} />
                </h4>
                <h5 className="dashboardTitle">Users</h5>
              </div>
              <div className="dash-imgs">
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  className="dashboardIcon"
                />
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
