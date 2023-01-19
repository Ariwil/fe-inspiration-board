import "./NewBoard.css";
import PropTypes from "prop-types";

import { useState } from "react";

const INITIAL_FORM_DATA = {
  title: "",
  owner: "",
};

const NewBoard = (props) => {
  const [BoardData, setBoardData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    let datafield = e.target.value;
    const NewBoardData = {
      ...BoardData,
      [e.target.name]: datafield,
    };
    setBoardData(NewBoardData);
  };

  const handleNewBoardSubmit = (e) => {
    e.preventDefault();
    props.addBoardCallback(BoardData);
    setBoardData(INITIAL_FORM_DATA);
  };
  const ownerBorderClass = BoardData.owner ? "" : "empty";
  const titleBorderClass = BoardData.title ? "" : "empty";

  if (props.boardForm === true) {
    return (
      <form onSubmit={handleNewBoardSubmit}>
        <label htmlFor="title">Title</label>
        <input
          className={titleBorderClass}
          type="text"
          id="title"
          name="title"
          value={BoardData.title}
          onChange={handleChange}
        />

        <label htmlFor="owner">Name</label>
        <input
          className={ownerBorderClass}
          type="text"
          id="owner"
          name="owner"
          value={BoardData.owner}
          onChange={handleChange}
        />

        <input
          type="submit"
          value="Add Board"
          disabled={!BoardData.owner || !BoardData.title}
        />
      </form>
    );
  } else {
    return "";
  }
};

NewBoard.propTypes = {
  addBoardCallback: PropTypes.func.isRequired,
  boardForm: PropTypes.bool.isRequired,
};

export default NewBoard;
