import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/UserContext";
import isAllowed from "../../middlewares/allow";
import Breadcrumb from "../../components/breadcrumb/index";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Loading from "../../components/loading";
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
  const [urlapi, setUrlapi] = useState(
    `${process.env.REACT_APP_API_BASE_URL}/api/gallery/`
  );
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(1);
  const token = localStorage.getItem("authToken");
  const { userData, demo } = useContext(Context);
  const [modalData, setModalData] = useState({
    show: false,
    name: "",
    surname: "",
    email: "",
  });

  const closeEmailModal = () => {
    setModalData(false, null, null);
  };

  useEffect(() => {
    if (id) {
      setUrlapi(`${process.env.REACT_APP_API_BASE_URL}/api/gallery/${id}`);
    } else {
      setUrlapi(`${process.env.REACT_APP_API_BASE_URL}/api/gallery/`);
    }
    axios
      .get(urlapi, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response.data.gallery");
        console.log(response.data.gallery);
        setLoading(false);
        setData(response.data.gallery);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token, reload]);

  const title = "Gallery";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];

  function deletePhoto(id) {
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
              `${process.env.REACT_APP_API_BASE_URL}/api/gallery/delete/${id}`,
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
            <div className="row">
              <div className="col-12">
                <div className="card pageContainer">
                  <div className="card-body">
                    <Link
                      to={id ? `/add/gallery/${id}` : "/add/gallery"}
                    >
                      <div className="addButton col-sm-4 col-md-4 col-lg-3">
                        <FontAwesomeIcon
                          icon={faCirclePlus}
                          className="addButtonIcon"
                        />
                        <div className="card-body d-flex px-1">Add photo</div>
                      </div>
                    </Link>
                    <Table className="tableRow" bordered hover>
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.length === 0 && (
                          <p className="my-5">Gallery not found</p>
                        )}
                        {data.map((photo) => {
                          return (
                            <tr>
                              <td>
                                {" "}
                                <img
                                  src={`${
                                    process.env.REACT_APP_API_BASE_URL
                                  }/api/gallery/photo/${photo && photo.photo}`}
                                  alt=""
                                  className="photo"
                                />
                              </td>
                              {/*
                                onClick={() =>
                                    openPhotoModal(
                                      `${
                                        process.env.REACT_APP_API_BASE_URL
                                      }/api/screenshot/img/${
                                        screenshot && screenshot.file
                                      }`,
                                      screenshot.name
                                    )
                                  } */}

                              <td
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Link
                                  to={`/photo/${photo._id}`}
                                  style={{ flex: "1" }}
                                >
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip className="tooltip">
                                        {" "}
                                        Photo
                                      </Tooltip>
                                    }
                                  >
                                    <button className=" btn btn-primary btn-sm ms-1 btnTask">
                                      <FontAwesomeIcon
                                        icon={faListCheck}
                                        className="taskIcon taskIcon3"
                                      />
                                      Detail
                                    </button>
                                  </OverlayTrigger>
                                </Link>

                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <Link to={`/edit/photo/${photo._id}`}>
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

                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip className="tooltip">
                                        Delete photo
                                      </Tooltip>
                                    }
                                  >
                                    <button
                                      onClick={() => deletePhoto(photo._id)}
                                      className="btn btn-danger btn-sm ms-1 taskButton"
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        className="taskIcon taskIcon2"
                                      />
                                    </button>
                                  </OverlayTrigger>
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
