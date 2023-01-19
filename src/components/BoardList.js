import PropTypes from "prop-types";

import Board from "./Board";

function BoardList(props) {
  const boardComponents = [];
  const boardList = props.boardList;

  for (const board of boardList) {
    boardComponents.push(
      <Board
        key={board.id}
        id={board.id}
        title={board.title}
        name={board.owner} //
        selected={board.selected}
        selectBoard={props.selectBoard}
        unselectBoard={props.unselectBoard}
        deleteBoard={props.deleteBoard}
      />
    );
  }

  return <div>{boardComponents}</div>;
}

BoardList.propTypes = {
  boardList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      selected: PropTypes.bool,
    })
  ),
  selectBoard: PropTypes.func.isRequired,
  unselectBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
};

export default BoardList;
