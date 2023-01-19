import PropTypes from "prop-types";

function Board(props) {
  const boardId = props.id;
  const boardTitle = props.title;
  const selectBoard = props.selectBoard;
  const unselectBoard = props.unselectBoard;
  const deleteBoard = props.deleteBoard;

  const toggleSelected = (boardId) => {
    if (props.selected === false || props.selected == null) {
      selectBoard(boardId);
    } else {
      unselectBoard(boardId);
    }
  };

  return (
    <div>
      <ul>
        <li onClick={() => toggleSelected(boardId)}>{boardTitle}</li>
        <button onClick={() => deleteBoard(boardId)}>Delete</button>
      </ul>
    </div>
  );
}

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  selected: PropTypes.bool,
  selectBoard: PropTypes.func.isRequired,
  unselectBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
};
export default Board;
