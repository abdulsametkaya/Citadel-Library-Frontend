import React, { useEffect, useState } from "react";
import { getAuthorAll } from "../../../../api/author-service";
import Loading from "../../../common/loading/loading";
import "./filter-menu.scss";

const AuthorFilter = (props) => {
  const { setSelectedAuthors } = props;
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const responseAuthor = await getAuthorAll();
      const authorContent = responseAuthor.data;
      setAuthors(authorContent);

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

  const handleAuthor = (e) => {
    setSelectedAuthors(e.target.value);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="filter-card">
          <div className="filter-header">Author</div>
          <div className="filter-body-group">
            {authors.map((author) => (
              <div className="filter-body" key={author.id}>
                <input
                  type="radio"
                  id={author.id}
                  value={author.id}
                  name="Author"
                  onChange={handleAuthor}
                />
                <label for={author.id}>{author.name}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthorFilter;
