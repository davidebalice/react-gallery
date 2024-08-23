import {
  faCirclePlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import Loading from "../../components/loading";
import EditModal from "../../components/Modal/EditModal";
import PhotoModal from "../../components/Modal/PhotoModal";
import Pagination from "../../components/pagination/Pagination";
import Spacer from "../../components/spacer";
import { Context } from "../../context/UserContext";

const Gallery = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(1);
  const [editData, setEditData] = useState({ show: false, name: "", id: "" });
  const [photoData, setPhotoData] = useState({ show: false, imgUrl: "" });
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const token = localStorage.getItem("authToken");
  const { userData, demo } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (id) {
      setSelectedCategory(id);
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        selectedCategory
          ? `${process.env.REACT_APP_API_BASE_URL}/api/gallery/${selectedCategory}?page=${page}`
          : `${process.env.REACT_APP_API_BASE_URL}/api/gallery?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("response.data.gallery");
        console.log(response.data.gallery);
        setLoading(false);
        setData(response.data.gallery);
        setCategories(response.data.categories);
        setSelectedCategory(response.data.category._id);
        setData(response.data.users);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [page]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/gallery/${selectedCategory}?page=${page}`,
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
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token, reload, selectedCategory, page]);

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
    navigate(`/gallery/`);
  };

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

                    {data && data.length === 0 && (
                      <p className="my-5">Gallery not found</p>
                    )}

                    <div className="photoCardContainer">
                      {data &&
                        data.map((photo) => {
                          return (
                            <div className="photoCard" key={photo._id}>
                              <img
                                src={`${
                                  process.env.REACT_APP_API_BASE_URL
                                }/api/gallery/thumb/${photo && photo.photo}`}
                                alt=""
                                className="photoImg"
                                onClick={() =>
                                  openPhotoModal(
                                    `${
                                      process.env.REACT_APP_API_BASE_URL
                                    }/api/gallery/photo/${
                                      photo && photo.photo
                                    }`,
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

            {data && (
              <Pagination
                pageName="gallery"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            <EditModal
              show={editData.show}
              closeEditModal={closeEditModal}
              editData={editData}
              updateUrl="/api/update/photo"
              setReload={setReload}
            />
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
