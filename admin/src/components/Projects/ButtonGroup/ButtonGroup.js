import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faListCheck,
  faTableList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ButtonGroup = ({ projectId, selectedTab }) => {
  const location = useLocation();

  return (
    <>
      <div className="buttonGroup">
        <Link to={`/project/${projectId}`}>
          <button
            type="button"
            className={`projectTab ${
              selectedTab === "project" ? "projectTabSelected" : ""
            }`}
          >
            <FontAwesomeIcon icon={faTableList} className="buttonGroupIcon" />{" "}
            Project detail
          </button>
        </Link>

        <Link to={`/project/tasks/${projectId}`}>
          <button
            type="button"
            className={`projectTab ${
              selectedTab === "tasks" ? "projectTabSelected" : ""
            }`}
          >
            <FontAwesomeIcon icon={faListCheck} className="buttonGroupIcon" />{" "}
            Tasks
          </button>
        </Link>

        <Link to={`/project/members/${projectId}`}>
          <button
            type="button"
            className={`projectTab  ${
              selectedTab === "members" ? "projectTabSelected" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="buttonGroupIcon" />{" "}
            Members
          </button>
        </Link>
      </div>
    </>
  );
};

export default ButtonGroup;
