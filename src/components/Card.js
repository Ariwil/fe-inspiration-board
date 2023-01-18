import PropTypes from "prop-types";

import "./Card.css";

function Card(props) {
  const cardId = props.id;
  const cardMessage = props.message;
  const liked = props.liked;
  const numOfLikes = props.numOfLikes;
  const updateLike = props.updateLike;
  const deleteCard = props.deleteCard;

  // const updateLike = (cardId, updatedPrice, liked) => {
  //   const newCardList = [];
  //   axios
  //     .patch(`${URL}/cards/${cardId}/${liked}`)
  //     .then((response) => {
  //       for (const card of cardList) {
  //         if (card.id !== cardId) {
  //           newCardList.push(card);
  //         } else {
  //           const newCard = {
  //             ...card,
  //             liked: !card.liked,
  //             likes_count: updatedPrice,
  //           };
  //           newCardList.push(newCard);
  //         }
  //       }
  //       setCardList(newCardList);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // const toggleSelected = (cardId) => {
  //   if (props.selected === false) {
  //     selectCard(cardId);
  //   } else {
  //     unselectCard(cardId);
  //   }
  // };
  function changeLikes(liked) {
    if (!liked) {
      updateLike(cardId, numOfLikes + 1, "like");
    } else {
      updateLike(cardId, numOfLikes - 1, "unlike");
    }
  }

  const buttonContent = liked ? "💗" : "🤍";

  return (
    <div>
      <h3>{cardMessage}</h3>
      <p>{numOfLikes}</p>
      <button onClick={() => changeLikes(liked)}>{buttonContent} </button>
      {/* <button onClick={() => changeLikes(liked)}>"💔" </button> */}
      <button onClick={() => deleteCard(cardId)}>Delete</button>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  selectCard: PropTypes.func.isRequired,
  unselectCard: PropTypes.func.isRequired,
};
export default Card;
