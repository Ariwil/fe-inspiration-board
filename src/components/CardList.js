import PropTypes from "prop-types";

import Card from "./Card";

function CardList(props) {
  const cardComponents = [];
  const cardList = props.cardList;
  const selectedBoard = props.selectedBoard;

  for (const card of cardList) {
    if (card.board_id === selectedBoard.id) {
      cardComponents.push(
        <Card
          key={card.id}
          id={card.id}
          message={card.message}
          liked={card.liked}
          numOfLikes={card.likes_count}
          updateLike={props.updateLike}
          deleteCard={props.deleteCard}
        />
      );
    }
  }

  return <div>{cardComponents}</div>;
}

CardList.propTypes = {
  cardList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      board_id: PropTypes.number,
      likes_count: PropTypes.number.isRequired,
      liked: PropTypes.bool,
    })
  ),
  updateLike: PropTypes.func.isRequired,
  selectedBoard: PropTypes.object.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default CardList;
