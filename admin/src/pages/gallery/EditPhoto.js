import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import Spacer from "../../components/spacer/index";
import isAllowed from "../../middlewares/allow";
import NotPermission from "../Auth/notPermission";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

const EditTask = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { userData, demo } = useContext(Context);
  const title = "Edit task";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  const { id } = useParams();
  const [projectId, setProjectId] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    priority: "",
    label: "",
    description: "",
    deadline: "",
    owner: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/edit/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setFormData({
          ...response.data.task,
          deadline: response.data.deadline,
        });
        setProjectId(response.data.projectId._id);
        console.log(response.data);
        console.log(response.data.projectId._id);
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error", error, "error");
      });
  }, []);

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
          `${process.env.REACT_APP_API_BASE_URL}/api/edit/task/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log("response.data");
          console.log(response.data);
          setResponseData(response.data.message);

          Swal.fire({
            title: "Taks updated",
            text: "",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Back to tasks",
            cancelButtonText: "Close",
          }).then((result) => {
            if (result.isConfirmed) {
              if (response.data.status === "success") {
                navigate(`/project/tasks/${projectId}`);
              }
            }
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      {userData &&
      formData &&
      isAllowed(
        userData.role,
        userData._id,
        formData.members,
        formData.owner
      ) ? (
        <div className="page">
          <Breadcrumb title={title} brad={brad} />
          <div class="row">
            <Link to={`/project/tasks/${projectId}`}>
              <div class="backButton col-sm-4 col-md-4 col-lg-3">
                <FontAwesomeIcon
                  icon={faCircleChevronLeft}
                  className="backButtonIcon"
                />
                <div class="card-body d-flex px-1">Back</div>
              </div>
            </Link>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row justify-content-start formContainer">
                <div className="col-md-6 mt-3">
                  <label for="name">
                    <b>Name of task</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInput}
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label for="status">
                    <b>Status</b>
                  </label>
                  <select
                    className="form-control"
                    name="status"
                    value={formData.status}
                    required
                    onChange={handleInput}
                  >
                    <option value=""> - Select status - </option>
                    <option value="Open">Open</option>
                    <option value="Close">Close</option>
                  </select>
                </div>
                <div className="col-md-6 mt-3">
                  <label for="priority">
                    <b>Priority</b>
                  </label>
                  <select
                    className="form-control"
                    name="priority"
                    value={formData.priority}
                    required
                    onChange={handleInput}
                  >
                    <option value=""> - Select priority - </option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div className="col-md-6 mt-3">
                  <label for="label">
                    <b>Label</b>
                  </label>
                  <select
                    className="form-control"
                    name="label"
                    value={formData.label}
                    required
                    onChange={handleInput}
                  >
                    <option value=""> - Select label - </option>
                    <option value="Task">Task</option>
                    <option value="Bug">Bug</option>
                    <option value="Quote">Quote</option>
                  </select>
                </div>

                <div className="col-md-6 mt-3">
                  <label for="deadline">
                    <b>Deadline date</b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="deadline"
                    required
                    value={formData.deadline}
                    onChange={handleInput}
                  />
                </div>

                <div className="col-md-6 mt-3"></div>

                <Spacer height={20} />

                <div className="col-md-12">
                  <label for="brand">
                    <b>Description</b>
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInput}
                  ></textarea>
                </div>
              </div>

              <button
                onClick={submitForm}
                className="btn btn-sm saveButton mt-3"
              >
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  className="saveButtonIcon"
                />{" "}
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NotPermission />
      )}
    </>
  );
};

export default EditTask;
