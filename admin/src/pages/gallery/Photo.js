import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/UserContext";
import isAllowed from "../../middlewares/allow";
import Breadcrumb from "../../components/breadcrumb/index";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Spacer from "../../components/spacer";
import moment from "moment";
import Loading from "../../components/loading";
import PhotoModal from "../../components/Modal/PhotoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faChevronLeft,
  faCalendar,
  faClock,
  faComment,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

const Project = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("activities");
  const token = localStorage.getItem("authToken");
  const { userData, demo } = useContext(Context);
  const [data, setData] = useState({
    loading: true,
    progress: 0,
    activities: [],
    comments: [],
    files: [],
    screenshots: [],
    members: [],
    task: [],
    project: {},
    demo: false,
    lastComment: [],
    lastScreenshot: [],
  });
  const [photoData, setPhotoData] = useState({ show: false, imgUrl: "" });

  function updateComments(newComments) {
    setData((prevData) => ({
      ...prevData,
      comments: newComments,
    }));
  }

  function updateFiles(newFiles) {
    setData((prevData) => ({
      ...prevData,
      files: newFiles,
    }));
  }

  function updateScreenshots(newScreenshots) {
    setData((prevData) => ({
      ...prevData,
      screenshots: newScreenshots,
    }));
  }

  function updateActivities(newActivities) {
    setData((prevData) => ({
      ...prevData,
      activities: newActivities,
    }));
  }

  function updateMembers(newMembers) {
    setData((prevData) => ({
      ...prevData,
      members: newMembers,
    }));
  }

  const handleStatus = async (event, id) => {
    if (data.demo) {
      Swal.fire({
        title: "Demo mode",
        text: "Crud operations are not allowed",
        icon: "error",
        cancelButtonText: "Close",
      });
    } else {
      const isChecked = event.target.checked;
      try {
        axios
          .post(
            process.env.REACT_APP_API_BASE_URL + "/api/activity/update-status",
            {
              activityId: id,
              checked: isChecked,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            setData((prevData) => {
              return {
                ...prevData,
                activities: prevData.activities.map((activity) =>
                  activity._id === id
                    ? { ...activity, status: response.data.status }
                    : activity
                ),
              };
            });
          })
          .catch((error) => {
            console.error("Error during api call:", error);
          });
      } catch (error) {
        console.error("Errore nella chiamata API:", error);
      }
    }
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/api/task/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData((prevData) => ({
          ...prevData,
          loading: false,
          demo: response.data.demo,
          comments: response.data.comments,
          project: response.data.task.project_id,
          task: response.data.task,
          members: response.data.task.members,
          screenshots: response.data.screenshots,
          activities: response.data.activities,
          files: response.data.files,
        }));

        console.log(response.data.task);
        console.log("response.data.demo");
        console.log(response.data.demo);
        console.log("response.data.screenshots");
        console.log(response.data.screenshots);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token]);

  useEffect(() => {
    const completedActivities = data.activities.filter(
      (activity) => activity.status === "Done"
    );
    const percentage = parseInt(
      (completedActivities.length / data.activities.length) * 100
    );

    setData((prevData) => ({
      ...prevData,
      progress: percentage,
    }));

    console.log(completedActivities.length);
    console.log(data.activities.length);
    console.log(percentage);
  }, [data.activities]);

  const getLatestComment = (comments) => {
    if (!comments || comments.length === 0) {
      return null;
    }
    let latestComment = comments[0];
    for (const comment of comments) {
      if (comment.createdAt > latestComment.createdAt) {
        latestComment = comment;
      }
    }
    return latestComment;
  };

  const getLatestScreenshot = (screenshots) => {
    if (!screenshots || screenshots.length === 0) {
      return null;
    }
    let latestScreenshot = screenshots[0];
    for (const screenshot of screenshots) {
      if (screenshot.createdAt > latestScreenshot.createdAt) {
        latestScreenshot = screenshot;
      }
    }
    return latestScreenshot;
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      lastComment: getLatestComment(data.comments),
      lastScreenshot: getLatestScreenshot(data.screenshots),
    }));
  }, [data.comments, data.screenshots]);

  const openPhotoModal = (imgUrl, title) => {
    setPhotoData({ show: true, imgUrl, title });
  };

  const closePhotoModal = () => {
    setPhotoData(false, "", "");
  };

  const title = "Task";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  return (
    <>
      <div className="page">
        <Breadcrumb title={title} brad={brad} />
        {data.loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-12">
                <div className="card pageContainer">
                  <div className="tab-content paymentSetting_content mx-2">
                    <div
                      className="tab-pane fade show active"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <div className="row">
                        <div className="col-md-8 " style={{ color: "#333" }}>
                          <div style={{ padding: "20px" }}>
                            <Link to={`/project/tasks/${data.project._id}`}>
                              <div className="backButton col-sm-4 col-md-4 col-lg-3 mb-5">
                                <FontAwesomeIcon
                                  icon={faChevronLeft}
                                  className="backButtonIcon"
                                />
                                <div className="card-body d-flex px-1">
                                  Back to Tasks
                                </div>
                              </div>
                            </Link>

                            <label>
                              <b>{data.project.name}</b>
                              <br />
                              <b className="projectDetailTitle">
                                {data.task.name}
                              </b>
                              <br />
                            </label>

                            <div className="projectDetailData">
                              <p>
                                <p className="projectDetailMidTitle">
                                  Creation date:
                                </p>
                                {moment(data.task.createdAt).format(
                                  "DD/MM/YYYY"
                                )}
                              </p>
                              <p>
                                <p className="projectDetailMidTitle">
                                  Created by:
                                </p>
                                {data.task.owner ? data.task.owner.name : ""}{" "}
                                {data.task.owner ? data.task.owner.surname : ""}
                              </p>
                              <p>
                                <p className="projectDetailMidTitle">
                                  Last update:
                                </p>
                                {moment(data.task.lastUpdate).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </p>

                              <div>
                                <p className="projectDetailMidTitle mb-0">
                                  <b>Task progress</b>:
                                </p>
                                <div className="progressContainer">
                                  <div className="progressBarContainer">
                                    <div
                                      className="progressBar"
                                      style={{
                                        width: `${data.progress}%`,
                                        backgroundColor:
                                          data.progress <= 25
                                            ? "red"
                                            : data.progress <= 55
                                            ? "orange"
                                            : "#36c20b",
                                      }}
                                    >
                                      &nbsp;
                                    </div>
                                  </div>
                                  <div className="progressBarPercentage">
                                    {data.progress >= 0.1
                                      ? data.progress.toFixed(2)
                                      : "0"}{" "}
                                    %
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Spacer height={60} />

                           
                          </div>
                        </div>

                        <div className="col-12 col-md-4 mt-3 ">
                          <div className="sideSection">
                            <div className="sideText">
                              <label>
                                <b>Members:</b>
                              </label>
                              <div>
                                {Array.isArray(data.members) &&
                                data.members.length > 0 ? (
                                  data.members.map((member) => (
                                    <div
                                      key={member._id}
                                      className="membersRow memberSide"
                                    >
                                      <div className="imgThumbContainer">
                                        <img
                                          src={`${
                                            process.env.REACT_APP_API_BASE_URL
                                          }/api/user/img/${
                                            member.photo && member.photo
                                          }`}
                                          class="imgThumb"
                                          alt=""
                                        />
                                        <span className="text-primary bold">
                                          {member.name} {member.surname}
                                        </span>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div>No members</div>
                                )}
                              </div>
                            </div>
                          </div>

                          {data.lastComment &&
                            data.lastComment.comment !== "" && (
                              <div className="sideSection">
                                <div className="sideText">
                                  <>
                                    <p className="mb-2 bold">Last comment:</p>

                                    <div className="dataLastColumn">
                                      <div className="imgThumbContainer">
                                        <img
                                          src={`${
                                            process.env.REACT_APP_API_BASE_URL
                                          }/api/user/img/${
                                            data.lastComment.owner.photo &&
                                            data.lastComment.owner.photo
                                          }`}
                                          class="imgThumb"
                                          alt=""
                                        />{" "}
                                        <span className="text-primary bold">
                                          {data.lastComment.owner.name}{" "}
                                          {data.lastComment.owner.surname}
                                        </span>
                                      </div>

                                      <div className="dataContainer">
                                        <FontAwesomeIcon
                                          icon={faCalendar}
                                          className="text-primary dataIcon"
                                        />
                                        <span>
                                          {moment(
                                            data.lastComment.createdAt
                                          ).format("DD/MM/YYYY HH:mm")}
                                        </span>
                                      </div>
                                    </div>

                                    <br />
                                    <span>{data.lastComment.comment}</span>
                                  </>
                                </div>

                                <div
                                  onClick={() => setTab("comments")}
                                  style={{ color: "#333" }}
                                  className="AllButton"
                                >
                                  <FontAwesomeIcon
                                    icon={faComment}
                                    className="text-primary dataIcon"
                                  />
                                  All comments
                                </div>
                              </div>
                            )}

                          {data.lastScreenshot &&
                            data.lastScreenshot.comment !== "" && (
                              <div className="sideSection">
                                <div className="sideText">
                                  <>
                                    <p className="mb-2 bold">
                                      Last screenshot:
                                    </p>

                                    <div className="dataLastColumn">
                                      <div className="imgThumbContainer">
                                        <img
                                          src={`${
                                            process.env.REACT_APP_API_BASE_URL
                                          }/api/user/img/${
                                            data.lastScreenshot.owner.photo &&
                                            data.lastScreenshot.owner.photo
                                          }`}
                                          class="imgThumb"
                                          alt=""
                                        />{" "}
                                        <span className="text-primary bold">
                                          {data.lastScreenshot.owner.name}{" "}
                                          {data.lastScreenshot.owner.surname}
                                        </span>
                                      </div>

                                      <div className="dataContainer">
                                        <FontAwesomeIcon
                                          icon={faCalendar}
                                          className="text-primary dataIcon"
                                        />
                                        <span>
                                          {moment(
                                            data.lastScreenshot.createdAt
                                          ).format("DD/MM/YYYY HH:mm")}
                                        </span>
                                      </div>
                                    </div>

                                    <br />
                                    <img
                                      src={`${
                                        process.env.REACT_APP_API_BASE_URL
                                      }/api/screenshot/img/${
                                        data.lastScreenshot &&
                                        data.lastScreenshot.file
                                      }`}
                                      alt=""
                                      className="screenshotImg"
                                      onClick={() =>
                                        openPhotoModal(
                                          `${
                                            process.env.REACT_APP_API_BASE_URL
                                          }/api/screenshot/img/${
                                            data.lastScreenshot &&
                                            data.lastScreenshot.file
                                          }`,
                                          data.lastScreenshot.name
                                        )
                                      }
                                    />
                                  </>
                                </div>

                                <div
                                  onClick={() => setTab("comments")}
                                  style={{ color: "#333" }}
                                  className="AllButton"
                                >
                                  <FontAwesomeIcon
                                    icon={faImage}
                                    className="text-primary dataIcon"
                                  />
                                  All screenshots
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <PhotoModal
        show={photoData.show}
        closePhotoModal={closePhotoModal}
        title={photoData.title}
        imgUrl={photoData.imgUrl}
      />
    </>
  );
};

export default Project;
