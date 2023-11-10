import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/UserContext";
import isAllowed from "../../middlewares/allow";
import Breadcrumb from "../../components/breadcrumb/index";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Loading from "../../components/loading";
import ButtonGroup from "../../components/Projects/ButtonGroup/ButtonGroup";
import EmailModal from "../../components/Modal/EmailModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faEnvelope,
  faCirclePlus,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

const Gallery = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [client, setClient] = useState([]);
  const [reload, setReload] = useState(1);
  const token = localStorage.getItem("authToken");
  const { userData, demo } = useContext(Context);
  const [modalData, setModalData] = useState({
    show: false,
    name: "",
    surname: "",
    email: "",
  });

  const openEmailModal = (email, name, surname) => {
    setModalData({ show: true, email, name, surname });
  };

  const closeEmailModal = () => {
    setModalData(false, null, null);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response.data.tasks");
        console.log(response.data.tasks);
        console.log("response.data.client");
        console.log(response.data.client);
        setLoading(false);
        setData(response.data.tasks);
        setClient(response.data.client);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token, reload]);

  const title = "Tasks";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];

  function deleteTask(id) {
    Swal.fire({
      title: "Confirm delete?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (demo) {
          Swal.fire({
            title: "Demo mode",
            text: "Crud operations are not allowed",
            icon: "error",
            cancelButtonText: "Close",
          });
        } else {
          axios
            .post(
              `${process.env.REACT_APP_API_BASE_URL}/api/task/delete/${id}`,
              { id: id },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            )
            .then((response) => {
              console.log("response.data.user");
              console.log(response.data.user);
              if (response.data.status === "success") {
                setReload((prevCount) => prevCount + 1);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      }
    });
  }

  return (
    <>
      <EmailModal
        show={modalData.show}
        closeEmailModal={closeEmailModal}
        modalData={modalData}
      />
      <div className="page">
        <Breadcrumb title={title} brad={brad} />
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <ButtonGroup projectId={id} selectedTab="tasks" />
            <div className="row">
              <div className="col-12">
                <div className="card pageContainer">
                  <div className="card-body">
                    <Link to={`/project/add/task/${id}`}>
                      <div className="addButton col-sm-4 col-md-4 col-lg-3">
                        <FontAwesomeIcon
                          icon={faCirclePlus}
                          className="addButtonIcon"
                        />
                        <div className="card-body d-flex px-1">Add task</div>
                      </div>
                    </Link>
                    <Table className="tableRow" bordered hover>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Last update</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Priority</th>
                          <th>Label</th>
                          <th>Activities</th>
                          <th>Progress</th>
                          <th>Dead line</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.length === 0 && (
                          <p className="my-5">Task not found</p>
                        )}
                        {data.map((task) => {
                          const totalActivities = task.activities.length;
                          const completedActivities = task.activities.filter(
                            (activity) => activity.status === "Done"
                          ).length;
                          let completionPercentage =
                            totalActivities > 0
                              ? (completedActivities / totalActivities) * 100
                              : 0;
                          completionPercentage =
                            completionPercentage % 1 === 0
                              ? completionPercentage.toFixed(0)
                              : completionPercentage.toFixed(2);

                          const highestLastUpdate = task.activities.reduce(
                            (highest, activity) => {
                              if (!highest || activity.lastUpdate > highest) {
                                console.log(activity.lastUpdate);
                                return activity.lastUpdate;
                              }
                              return highest;
                            },
                            null
                          );

                          const formattedLastUpdate = highestLastUpdate
                            ? moment(highestLastUpdate).format(
                                "DD/MM/YYYY HH:mm"
                              )
                            : " - - -";

                          return (
                            <tr>
                              <td>{task.formattedDate}</td>
                              <td>{formattedLastUpdate}</td>
                              <td>{task.name}</td>
                              <td>{task.status}</td>
                              <td
                                style={{
                                  color:
                                    task.priority === "High"
                                      ? "#ff0000"
                                      : "#333",
                                }}
                              >
                                {task.priority}
                              </td>
                              <td>
                                <button
                                  onClick={() => null}
                                  className={`btn p-0 px-1 btn-success btn-sm`}
                                >
                                  {task.label}
                                </button>
                              </td>
                              <td>{totalActivities}</td>
                              <td>
                                <div className="progressBarContainerSm">
                                  <div
                                    className="progressBarSm"
                                    style={{
                                      width: `${completionPercentage}%`,
                                      backgroundColor:
                                        completionPercentage <= 25
                                          ? "red"
                                          : completionPercentage <= 55
                                          ? "orange"
                                          : "#36c20b",
                                    }}
                                  >
                                    {completionPercentage} %&nbsp;{"  "}
                                  </div>
                                </div>
                              </td>
                              <td>{task.formattedDeadline}</td>
                              <td
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Link
                                  to={`/project/task/${task._id}`}
                                  style={{ flex: "1" }}
                                >
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip className="tooltip">
                                        {" "}
                                        Detail of task, activities, files,
                                        comments
                                      </Tooltip>
                                    }
                                  >
                                    <button className=" btn btn-primary btn-sm ms-1 btnTask">
                                      <FontAwesomeIcon
                                        icon={faListCheck}
                                        className="taskIcon taskIcon3"
                                      />
                                      Detail of Task
                                    </button>
                                  </OverlayTrigger>
                                </Link>

                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  {isAllowed(
                                    userData.role,
                                    userData._id,
                                    task.members,
                                    task.owner
                                  ) ? (
                                    <Link to={`/project/edit/task/${task._id}`}>
                                      <OverlayTrigger
                                        placement="top"
                                        overlay={
                                          <Tooltip className="tooltip">
                                            Edit
                                          </Tooltip>
                                        }
                                      >
                                        <button
                                          onClick={() => null}
                                          className="btn btn-primary btn-sm ms-1 taskButton"
                                        >
                                          <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="taskIcon"
                                          />
                                        </button>
                                      </OverlayTrigger>
                                    </Link>
                                  ) : (
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip className="tooltip">
                                          Edit not allowed
                                        </Tooltip>
                                      }
                                    >
                                      <button
                                        onClick={() => null}
                                        className="btn btn-primary btn-sm ms-1 taskButton taskButtonDisabled"
                                      >
                                        <FontAwesomeIcon
                                          icon={faPenToSquare}
                                          className="taskIcon"
                                        />
                                      </button>
                                    </OverlayTrigger>
                                  )}

                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip className="tooltip">
                                        Send email to client
                                      </Tooltip>
                                    }
                                  >
                                    <button
                                      onClick={() =>
                                        client.email &&
                                        openEmailModal(
                                          client.email,
                                          client.companyName,
                                          null
                                        )
                                      }
                                      className="btn btn-primary btn-sm ms-1 taskButton"
                                    >
                                      <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="taskIcon"
                                      />
                                    </button>
                                  </OverlayTrigger>

                                  {isAllowed(
                                    userData.role,
                                    userData._id,
                                    task.members,
                                    task.owner
                                  ) ? (
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip className="tooltip">
                                          Delete task
                                        </Tooltip>
                                      }
                                    >
                                      <button
                                        onClick={() => deleteTask(task._id)}
                                        className="btn btn-danger btn-sm ms-1 taskButton"
                                      >
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          className="taskIcon taskIcon2"
                                        />
                                      </button>
                                    </OverlayTrigger>
                                  ) : (
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip className="tooltip">
                                          Delete task not allowed
                                        </Tooltip>
                                      }
                                    >
                                      <button className="btn btn-danger btn-sm ms-1 taskButton taskButtonDisabled">
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          className="taskIcon taskIcon2"
                                        />
                                      </button>
                                    </OverlayTrigger>
                                  )}
                                </div>
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
          </>
        )}
      </div>
    </>
  );
};
export default Gallery;
