import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../../../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import EditModal from "../../Modal/EditModal";
import PhotoModal from "../../Modal/PhotoModal";
import Loading from "../../../components/loading";
import Table from "react-bootstrap/Table";
import Divider from "../../divider/";
import Spacer from "../../spacer/";
import isAllowed from "../../../middlewares/allow";
import moment from "moment";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleXmark,
  faNoteSticky,
  faTrash,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Screenshots = ({
  screenshots,
  taskId,
  projectId,
  onUpdateScreenshots,
  updateScreenshots,
  task,
}) => {
  const inputFileRef = useRef(null);
  const token = localStorage.getItem("authToken");
  const [add, setAdd] = useState(false);
  const [editData, setEditData] = useState({ show: false, text: "", id: "" });
  const [photoData, setPhotoData] = useState({ show: false, imgUrl: "" });
  const [loading, setLoading] = useState(true);
  const { userData, demo } = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    screenshots: [],
    owner: "",
    task_id: taskId,
    project_id: projectId,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (e) => {
    const screenshots = e.target.files;
    setFormData({ ...formData, screenshots: screenshots });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      task_id: taskId,
      project_id: projectId,
    });
    setLoading(false);
  }, [taskId, projectId]);

  function handleUpdateFiles(newFiles) {
    onUpdateScreenshots(newFiles);
  }

  function removeFile(id) {
    Swal.fire({
      title: "Corfirm delete?",
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
              process.env.REACT_APP_API_BASE_URL + "/api/delete/screenshot/",
              { id: id, task_id: taskId },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            )
            .then((response) => {
              console.log("response.data.screenshots");
              console.log(response.data.screenshots);
              handleUpdateFiles(response.data.screenshots);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      }
    });
  }

  const openEditModal = (text, id) => {
    setEditData({ show: true, text, id });
  };

  const closeEditModal = () => {
    setEditData(false, null, null);
  };

  const openPhotoModal = (imgUrl, title) => {
    setPhotoData({ show: true, imgUrl, title });
  };

  const closePhotoModal = () => {
    setPhotoData(false, "", "");
  };

  const submitForm = (e) => {
    e.preventDefault();
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
          process.env.REACT_APP_API_BASE_URL + "/api/add/screenshot/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("response.data.screenshots");
          console.log(response.data.screenshots);

          setFormData({
            ...formData,
            screenshots: "",
            name: "",
          });

          if (inputFileRef.current) {
            inputFileRef.current.value = "";
          }

          handleUpdateFiles(response.data.screenshots);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {userData &&
          formData &&
          isAllowed(
            userData.role,
            userData._id,
            task.members,
            task.owner._id
          ) ? (
            <div
              className="addButton col-sm-4 col-md-4 col-lg-3"
              onClick={() => setAdd(!add)}
            >
              <FontAwesomeIcon
                icon={add ? faCircleXmark : faCirclePlus}
                className="addButtonIcon"
              />
              <div className="card-body d-flex px-1">
                {add ? "Close" : "Add screenshot"}
              </div>
            </div>
          ) : (
            <div className="addButton col-sm-4 col-md-4 col-lg-3 disabledBg">
              <FontAwesomeIcon
                icon={add ? faCircleXmark : faCirclePlus}
                className="addButtonIcon"
              />
              <div className="card-body d-flex px-1">
                {add ? "Close" : "Add screenshot"}
              </div>
            </div>
          )}

          {add && (
            <form enctype="multipart/form-data" method="post" id="formUpload">
              <label for="name">
                <b>Add screenshot to task</b>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                required
                value={formData.name}
                onChange={handleInput}
                placeholder="Description of screenshot"
              />
              <Spacer height={20} />
              <input
                type="file"
                className="form-control"
                ref={inputFileRef}
                name="file"
                required
                onChange={handleFile}
                multiple
              />
              <button
                onClick={submitForm}
                className="btn addButtonSm btn-sm mt-3"
              >
                <FontAwesomeIcon icon={faPlus} className="addButtonIconSm" />
                Add screenshot
              </button>
              <Divider
                className="divider"
                marginTop={60}
                marginBottom={60}
                borderSize={1}
                borderType={"solid"}
                borderColor={"#ddd"}
              >
                {" "}
              </Divider>
            </form>
          )}

          <div className="screenshotCardContainer">
            <div className="row">
              {Array.isArray(screenshots) && screenshots.length > 0 ? (
                screenshots.map((screenshot) => (
                  <div
                    className="screenshotCardWrapper col-lg-3 col-md-6 col-sm-12"
                    key={screenshot._id}
                  >
                    <div className="screenshotCard">
                      <div className="screenshotCardHeader">
                        {screenshot.createdAt !== null &&
                          moment(screenshot.createdAt).format("DD/MM/YYYY")}

                        {screenshot.owner.name && screenshot.owner.surname ? (
                          <span>
                            {screenshot.owner.name} {screenshot.owner.surname}
                          </span>
                        ) : null}
                      </div>

                      <img
                        src={`${
                          process.env.REACT_APP_API_BASE_URL
                        }/api/screenshot/img/${screenshot && screenshot.file}`}
                        alt=""
                        className="screenshotImg"
                        onClick={() =>
                          openPhotoModal(
                            `${
                              process.env.REACT_APP_API_BASE_URL
                            }/api/screenshot/img/${
                              screenshot && screenshot.file
                            }`,
                            screenshot.name
                          )
                        }
                      />

                      <div className="screenshotCardHeader">
                        <p>{screenshot.name}</p>
                        <div className="activityButton">
                          {userData &&
                          formData &&
                          isAllowed(
                            userData.role,
                            userData._id,
                            task.members,
                            task.owner._id
                          ) ? (
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip className="tooltip">
                                  {" "}
                                  Edit description of screenshot
                                </Tooltip>
                              }
                            >
                              <div
                                onClick={() =>
                                  openEditModal(screenshot.name, screenshot._id)
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  className="activityButtonEdit"
                                />
                              </div>
                            </OverlayTrigger>
                          ) : (
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip className="tooltip">
                                  {" "}
                                  Edit description of screenshot not allowed
                                </Tooltip>
                              }
                            >
                              <div>
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  className="activityButtonEdit disabledColor"
                                />
                              </div>
                            </OverlayTrigger>
                          )}

                          {userData &&
                          formData &&
                          isAllowed(
                            userData.role,
                            userData._id,
                            task.members,
                            task.owner._id
                          ) ? (
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip className="tooltip">
                                  {" "}
                                  Delete screenshot
                                </Tooltip>
                              }
                            >
                              <div onClick={() => removeFile(screenshot._id)}>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="activityButtonDelete"
                                />
                              </div>
                            </OverlayTrigger>
                          ) : (
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip className="tooltip">
                                  {" "}
                                  Delete screenshot not allowed
                                </Tooltip>
                              }
                            >
                              <div>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="activityButtonDelete disabledColor"
                                />
                              </div>
                            </OverlayTrigger>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-5">
                  <br />
                  No screenshots
                  <br />
                  <br />
                </div>
              )}
            </div>
          </div>
          <EditModal
            show={editData.show}
            closeEditModal={closeEditModal}
            editData={editData}
            updateUrl="/api/update/screenshot"
            onUpdateActivities={handleUpdateFiles}
            type="files"
          />
          <PhotoModal
            show={photoData.show}
            closePhotoModal={closePhotoModal}
            title={photoData.title}
            imgUrl={photoData.imgUrl}
          />
        </>
      )}
    </>
  );
};

export default Screenshots;
