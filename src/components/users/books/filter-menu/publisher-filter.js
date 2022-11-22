import React, { useEffect, useState } from "react";
import { getPublisherAll } from "../../../../api/publisher-service";
import Loading from "../../../common/loading/loading";
import "./filter-menu.scss";

const PublisherFilter = (props) => {
  const { setSelectedPublishers } = props;
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const responsePublisher = await getPublisherAll();
      const publisherContent = responsePublisher.data;
      setPublishers(publisherContent);

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

  const handlePublisher = (e) => {
    setSelectedPublishers(e.target.value);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="filter-card">
          <div className="filter-header">Publisher</div>
          <div className="filter-body-group">
            {publishers.map((publisher) => (
              <div className="filter-body" key={publisher.id}>
                <input
                  type="radio"
                  id={publisher.id}
                  value={publisher.name}
                  name="publisher"
                  onChange={handlePublisher}
                />
                <label for={publisher.id}>{publisher.name}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PublisherFilter;
