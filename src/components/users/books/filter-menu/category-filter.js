import React, { useEffect, useState } from "react";
import { getCategoriesAll } from "../../../../api/category-service";
import Loading from "../../../common/loading/loading";
import "./filter-menu.scss";

const CategoryFilter = (props) => {
  const { setSelectedCategories } = props;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const responseCategory = await getCategoriesAll();
      const categoryContent = responseCategory.data;
      setCategories(categoryContent);

      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  const handleCategory = (e) => {
    setSelectedCategories(e.target.value);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="filter-card">
          <div className="filter-header">Category</div>
          <div className="filter-body-group">
            {categories.map((category) => (
              <div className="filter-body" key={category.id}>
                <input
                  type="radio"
                  id={category.id}
                  value={category.name}
                  name="category"
                  onChange={handleCategory}
                />
                <label for={category.id}>{category.name}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryFilter;
