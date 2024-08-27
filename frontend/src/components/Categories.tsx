import axios from "axios";
import { useEffect, useState } from "react";

interface CategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Categories = ({
  selectedCategory,
  setSelectedCategory,
}: CategoriesProps) => {
  interface categoryData {
    _id: string;
    name: string;
  }

  const [categories, setCategories] = useState<categoryData[]>([]);

  const fetchCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/categories`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error during API call:", error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="mt-2 mb-2">
        <ul className="category-list">
          {categories.map((category) => (
            <li
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`category-item ${
                selectedCategory === category._id ? "selected" : ""
              }`}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Categories;
