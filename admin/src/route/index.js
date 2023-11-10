import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import ForgotPassword from "../pages/Auth/forgotPassword";
import Users from "../pages/users/Users";
import AddUser from "../pages/users/AddUser";
import EditUser from "../pages/users/EditUser";
import PhotoUser from "../pages/users/PhotoUser";
import Gallery from "../pages/gallery/Gallery";
import Photo from "../pages/gallery/Photo";
import AddPhoto from "../pages/gallery/AddPhoto";
import EditPhoto from "../pages/gallery/EditPhoto";
import Profile from "../pages/profile/Profile";
import Categories from "../pages/categories/Categories";
import AddCategory from "../pages/categories/AddCategory";
import EditCategory from "../pages/categories/EditCategory";

export function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/gallery/" element={<Gallery />} />
        <Route path="/gallery/:id" element={<Gallery />} />
        <Route path="/photo/:id" element={<Photo />} />
        <Route path="/add/gallery/:id" element={<AddPhoto />} />
        <Route path="/edit/gallery/:id" element={<EditPhoto />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/add/category/" element={<AddCategory />} />
        <Route path="/edit/category/:id" element={<EditCategory />} />

        <Route path="/users" element={<Users />} />
        <Route path="/add/user/" element={<AddUser />} />
        <Route path="/edit/user/:id" element={<EditUser />} />
        <Route path="/photo/user/:id" element={<PhotoUser />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
