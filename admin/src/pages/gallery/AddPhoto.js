import { useState, useContext, useRef, useEffect } from "react";
import { Context } from "../../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import Spacer from "../../components/spacer";
import Divider from "../../components/divider/";
import Loading from "../../components/loading";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

const AddPhoto = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { userData, demo } = useContext(Context);
  const title = "Add photo to gallery";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  const { id } = useParams();
  const inputFileRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [photoData, setPhotoData] = useState({ show: false, imgUrl: "" });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    category_id: null,
    photo: [],
    categories: [],
    message: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/add/gallery/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response.data.categories");
        console.log(response.data.categories);
        setFormData({ ...formData, categories: response.data.categories });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error", error, "error");
      });
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (e) => {
    const photo = e.target.files;
    setFormData({ ...formData, photo: photo });

    const fileList = e.target.files;
    const filesArray = Array.from(fileList);

    const filesWithPreview = filesArray.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });

    setFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
  };

  useEffect(() => {
    /*
    setFormData({
      ...formData,
    });*/
    setLoading(false);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    if (demo) {
      Swal.fire({
        title: "Demo mode",
        text: "Crud operations are not allowed",
        icon: "error",
        cancelButtonText: "Close",
      });
      setLoading(false);
    } else {
      axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/api/add/gallery/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("response.data.message");
          console.log(response.data.message);
          setLoading(false);
          setFormData({
            ...formData,
            photo: "",
            message: response.data.message,
          });

          if (inputFileRef.current) {
            inputFileRef.current.value = "";
          }

          //handleUpdateFiles(response.data.photo);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <div className="page">
        <Breadcrumb title={title} brad={brad} />
        <div className="card pageContainer">
          <div className="card-body formContainer">
            <Link
              to={
                formData.category_id
                  ? `/gallery/${formData.category_id}`
                  : "/gallery"
              }
            >
              <div class="backButton col-sm-4 col-md-4 col-lg-3">
                <FontAwesomeIcon
                  icon={faCircleChevronLeft}
                  className="backButtonIcon"
                />
                Back
              </div>
            </Link>
            <Spacer height={30} />
            <div className="row justify-content-center">
              {formData.message && (
                <p className="successMessage">{formData.message}</p>
              )}
              <form enctype="multipart/form-data" method="post" id="formUpload">
                <label for="name">
                  <b>Category</b>
                </label>
                <Spacer height={10} />
                <select
                  type="text"
                  className="form-control"
                  name="category_id"
                  required
                  onChange={handleInput}
                >
                  <option> - Select category - </option>
                  {formData.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <Spacer height={40} />
                <b>Select single file o multiple files</b>
                <Spacer height={10} />
                <input
                  type="file"
                  className="form-control"
                  ref={inputFileRef}
                  name="file"
                  required
                  onChange={handleFile}
                  multiple
                />
                <Spacer height={30} />
                {loading ? (
                  <Loading />
                ) : (
                  <button
                    onClick={submitForm}
                    className="btn addButtonSm btn-sm mt-3"
                  >
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      className="addButtonIconSm"
                    />
                    Upload photo
                  </button>
                )}

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
              <div className="previewImgContainer">
                {files.map((fileObj, index) => (
                  <div key={index} className="col-3">
                    <img
                      src={fileObj.preview}
                      alt={`Preview ${index}`}
                      className="previewImg"
                    />
                    <p>{fileObj.file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPhoto;
