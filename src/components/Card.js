//-Card doesn’t automatically show up when added
import PropTypes from "prop-types";

function Card(props) {
  const cardId = props.id;
  const cardMessage = props.message;
  const liked = props.liked;
  const numOfLikes = props.numOfLikes;
  const updateLike = props.updateLike;
  const deleteCard = props.deleteCard;

  function changeLikes(liked) {
    if (!liked) {
      updateLike(cardId, numOfLikes + 1, "like");
    } else {
      updateLike(cardId, numOfLikes - 1, "unlike");
    }
  }

  const buttonContent = liked ? "💗" : "🤍";

  const className = cardId % 2 === 0 ? "blue-card-color" : "purple-card-color";

  return (
    <div className={className}>
      <h3>{cardMessage}</h3>
      <p>{numOfLikes}</p>
      <button onClick={() => changeLikes(liked)}>{buttonContent} </button>
      <button onClick={() => deleteCard(cardId)}>Delete</button>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  numOfLikes: PropTypes.number.isRequired,
  updateLike: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};
export default Card;
