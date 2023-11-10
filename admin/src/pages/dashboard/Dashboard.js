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
import cover from "../../assets/img/cover.jpg";
import react_node from "../../assets/img/react_node.png";
import react from "../../assets/img/react.jpg";
import node from "../../assets/img/node.jpg";
import github from "../../assets/img/github.png";
import db from "../../assets/img/logo.png";

export default function Hero() {
  const token = localStorage.getItem("authToken");
  const { userData, demo } = useContext(Context);
  const [data, setData] = useState({
    projects: 0,
    tasks: 0,
    clients: 0,
    users: 0,
    activities: [],
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
                        <b className="dashboardText1">Task manager</b>
                        <p className="dashboardText2">
                          Task manager developer in Node and React, with basic
                          functions: Projects, tasks, activities, comments,
                          file, users, clients.
                        </p>

                        <img
                          src={react_node}
                          className="dashboardLogo"
                          alt="dashboard logo"
                        />

                        <img
                          src={cover}
                          className="dashboardImg"
                          alt="dashboard cover"
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
                          href="https://github.com/davidebalice/task-manager-frontend-react"
                          target="_blank"
                          className="githubLink"
                          rel="noreferrer"
                        >
                          github.com/davidebalice/task-manager-frontend-react
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
                          href="https://github.com/davidebalice/node-task-manager-api"
                          target="_blank"
                          className="githubLink"
                          rel="noreferrer"
                        >
                          github.com/davidebalice/node-task-manager-api
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row ">
          <div className="col-lg-3 col-sm-6 col-12 d-flex">
            <div className="dashboardBox">
              <div className="dash-counts">
                <h4>
                  <CountUp end={data && data.projects} />
                </h4>
                <h5 className="dashboardTitle">Projects</h5>
              </div>
              <div className="dash-imgs">
                <FontAwesomeIcon
                  icon={faTableList}
                  size="2xl"
                  className="dashboardIcon"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12 d-flex">
            <div className="dashboardBox">
              <div className="dash-counts">
                <h4>
                  <CountUp end={data && data.tasks} />
                </h4>
                <h5 className="dashboardTitle">Tasks</h5>
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
          <div className="col-lg-3 col-sm-6 col-12 d-flex">
            <div className="dashboardBox">
              <div className="dash-counts">
                <h4>
                  <CountUp end={data && data.clients} />
                </h4>
                <h5 className="dashboardTitle">Clients</h5>
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

        <div className="accordion mb-2" id="transactions_table">
          <div className="accordion-item">
            <div className="dashboardActivities" type="button">
              Last 10 activities
            </div>
            <div
              id="collapseOne3"
              className="accordion-collapse collapse show"
              data-bs-parent="#transactions_table"
            >
              <div className="accordion-body">
                <div className="table-responsive my-3">
                  <Table className="tableRow" hover bordered>
                    <thead>
                      <tr>
                        <th>Date last update</th>
                        <th>Project</th>
                        <th>Task</th>
                        <th>Activity</th>
                        <th>User</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.activities &&
                        data.activities.map((activity) => {
                          const lastUpdate = new Date(activity.lastUpdate);
                          const formattedDate = lastUpdate.toLocaleDateString(
                            [],
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          );
                          const formattedTime = lastUpdate.toLocaleTimeString(
                            [],
                            { hour: "2-digit", minute: "2-digit" }
                          );

                          return (
                            <tr key={activity._id} value={activity._id}>
                              <td>
                                {formattedDate}<br />{formattedTime}
                              </td>
                              <td className="cell">{activity.task_id.project_id.name}</td>
                              <td className="cell">{activity.task_id.name}</td>
                              <td className="cell">{activity.name}</td>
                              <td>
                                {activity.lastUpdateUser &&
                                  `${activity.lastUpdateUser.name} ${activity.lastUpdateUser.surname}`}
                              </td>
                              <td>
                                <p
                                  className="statusContainer"
                                  style={{
                                    background:
                                      activity.status === "Done"
                                        ? "#0aa70a"
                                        : "#f57b03",
                                  }}
                                >
                                  {activity.status}
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
