import { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/UserContext";
import Breadcrumb from "../../components/breadcrumb/index";
import Swal from "sweetalert2";
import Loading from "../../components/loading";
import EditModal from "../../components/Modal/EditModal";
import PhotoModal from "../../components/Modal/PhotoModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Spacer from "../../components/spacer";
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
  const [editData, setEditData] = useState({ show: false, name: "", id: "" });
  const [photoData, setPhotoData] = useState({ show: false, imgUrl: "" });
  const token = localStorage.getItem("authToken");
  const { userData, demo } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalData, setModalData] = useState({
    show: false,
    name: "",
    surname: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      setSelectedCategory(id);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setUrlapi(
        `${process.env.REACT_APP_API_BASE_URL}/api/gallery/${selectedCategory}`
      );
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
        setCategories(response.data.categories);
        setSelectedCategory(response.data.category._id);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/gallery/${selectedCategory}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setData(response.data.gallery);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token, reload, selectedCategory]);

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

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSelectedCategory(value);
  };
  /*
  function handleUpdate(newPhoto) {
    onUpdate(newPhoto);
  }
*/
  return (
    <>
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
                    <Link to={id ? `/add/gallery/${id}` : "/add/gallery"}>
                      <div className="addButton col-sm-4 col-md-4 col-lg-3">
                        <FontAwesomeIcon
                          icon={faCirclePlus}
                          className="addButtonIcon"
                        />
                        <div className="card-body d-flex px-1">Add photo</div>
                      </div>
                    </Link>

                    <select
                      type="text"
                      className="form-control selectCategories"
                      name="category_id"
                      required
                      onChange={handleInput}
                      value={selectedCategory}
                    >
                      <option> - Select category - </option>
                      {categories &&
                        categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                    </select>

                    <Spacer height={20} />

                    {data.length === 0 && (
                      <p className="my-5">Gallery not found</p>
                    )}

                    <div className="photoCardContainer">
                      {data.map((photo) => {
                        return (
                          <div className="photoCard" key={photo._id}>
                            <img
                              src={`${
                                process.env.REACT_APP_API_BASE_URL
                              }/api/gallery/photo/${photo && photo.photo}`}
                              alt=""
                              className="photoImg"
                              onClick={() =>
                                openPhotoModal(
                                  `${
                                    process.env.REACT_APP_API_BASE_URL
                                  }/api/gallery/photo/${photo && photo.photo}`,
                                  photo.name
                                )
                              }
                            />

                            {photo.name && (
                              <div className="photoCardTitle">
                                <p>{photo.name}</p>{" "}
                              </div>
                            )}

                            <div className="photoCardButtons">
                              <div className="activityButton">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip className="tooltip">
                                      {" "}
                                      Edit description of photo
                                    </Tooltip>
                                  }
                                >
                                  <div
                                    onClick={() =>
                                      openEditModal(photo.name, photo._id)
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faPenToSquare}
                                      className="activityButtonEdit"
                                    />
                                  </div>
                                </OverlayTrigger>
                              </div>
                              
                              <div className="activityButton">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip className="tooltip">
                                      {" "}
                                      Delete photo
                                    </Tooltip>
                                  }
                                >
                                  <div onClick={() => deletePhoto(photo._id)}>
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="activityButtonDelete"
                                    />
                                  </div>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <EditModal
              show={editData.show}
              closeEditModal={closeEditModal}
              editData={editData}
              updateUrl="/api/update/photo"
              setReload={setReload}
            />
            {/*   onUpdate={handleUpdate} */}
            <PhotoModal
              show={photoData.show}
              closePhotoModal={closePhotoModal}
              title={photoData.title}
              imgUrl={photoData.imgUrl}
            />
          </>
        )}
      </div>
    </>
  );
};
export default Gallery;
