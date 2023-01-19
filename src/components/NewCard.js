import PropTypes from "prop-types";

import { useState } from "react";

const INITIAL_FORM_DATA = {
  message: "",
  messageLength: 0,
};

const NewCard = (props) => {
  const [CardData, setCardData] = useState(INITIAL_FORM_DATA);
  const messageLength = CardData.messageLength;
  let selectedBoard = props.selectedBoard;

  if (Object.keys(selectedBoard).length === 0) {
    selectedBoard = false;
  } else {
  }

  // let messageLength = 0;
  const handleChange = (e) => {
    let datafield = e.target.value;
    const NewCardData = {
      ...CardData,
      [e.target.name]: datafield,
      board_id: selectedBoard.id,
      likes_count: 0,
      messageLength: datafield.length,
    };
    // messageLength = datafield.length;
    setCardData(NewCardData);
  };

  const handleNewCardSubmit = (e) => {
    e.preventDefault();
    props.addCardCallback(CardData);
    setCardData(INITIAL_FORM_DATA);
  };

  const tooLong = messageLength < 41 ? false : true;

  const inputClass = CardData.message /*|| !tooLong*/ ? "" : "empty"; //tooLong doesn't work here??
  //if input field for card message is empty ->
  //red box around input boxes and submit button unavailable
  return (
    <form onSubmit={handleNewCardSubmit}>
      <label htmlFor="message">Message</label>
      <input
        className={inputClass}
        type="text"
        id="message"
        name="message"
        value={CardData.message}
        onChange={handleChange}
      />

      <input
        type="submit"
        value="Add Card"
        disabled={!CardData.message || !selectedBoard || tooLong}
      />
    </form>
  );
};

NewCard.propTypes = {
  addCardCallback: PropTypes.func.isRequired,
  selectedBoard: PropTypes.object.isRequired,
};

export default NewCard;
