import "./App.css";

import axios from "axios";
import { useEffect, useState } from "react";
import NewBoard from "./components/NewBoard";
import BoardList from "./components/BoardList";
import NewCard from "./components/NewCard";
import CardList from "./components/CardList";

function App() {
  const [boardList, setBoardList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [boardForm, setBoardForm] = useState(true);

  const URL = "https://inspiration-backend.herokuapp.com";

  let displayBoardFormText = "HIDE/SHOW NEW BOARD FORM";
  const displayBoardForm = (boardForm) => {
    let newBoardForm = "";
    if (boardForm === false) {
      newBoardForm = true;
    } else {
      newBoardForm = false;
      displayBoardFormText = "SHOW NEW BOARD FORM";
    }
    setBoardForm(newBoardForm);
  };

  const getAllBoards = () => {
    axios
      .get(`${URL}/boards`)
      .then((response) => {
        const boaredsAPIResponseCopy = response.data.map((board) => {
          return {
            ...board,
          };
        });
        setBoardList(boaredsAPIResponseCopy);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getAllBoards, []); //initial get request

  const getAllCards = () => {
    axios
      .get(`${URL}/cards`)
      .then((response) => {
        const cardsAPIResponseCopy = response.data.map((card) => {
          return {
            ...card,
          };
        });
        setCardList(cardsAPIResponseCopy);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getAllCards, []); //initial get request

  const addBoard = (newBoardInfo) => {
    axios
      .post(`${URL}/boards`, newBoardInfo)
      .then((response) => {
        getAllBoards();
        const newBoards = [...boardList];
        const newBoardJSON = {
          ...newBoardInfo,
          id: response.data.id,
        };
        newBoards.push(newBoardJSON);
        setBoardList(newBoards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addCard = (newCardInfo) => {
    axios
      .post(`${URL}/cards`, newCardInfo)
      .then((response) => {
        getAllCards();
        const newCards = [...cardList];
        const newCardJSON = {
          ...newCardInfo,
          id: response.data.id,
          board_id: selectedBoard.id,
          // messageLength: newCardInfo.message.length /*response.data.id*/,
        };
        newCards.push(newCardJSON);
        setCardList(newCards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //TO ADD THIS WITH AXIOS - NEED A PATCH ROUTE IN be? (but don't think we need it to connect to axios? wait-- the setcards update might need to tho)
  const selectBoard = (boardId) => {
    const newBoardList = [];
    //turn every boards 'selected' key to false if not the selected board
    for (const board of boardList) {
      if (board.id === boardId) {
        const newBoard = {
          ...board,
          selected: true,
        };
        newBoardList.push(newBoard);
      } else {
        const newBoard = {
          ...board,
          selected: false,
        };
        newBoardList.push(newBoard);
      }
    }
    setBoardList(newBoardList);

    updateCardList(boardId, true);
  };

  const unselectBoard = (boardId) => {
    const newBoardList = [];
    for (const board of boardList) {
      if (board.id === boardId) {
        const newBoard = {
          ...board,
          selected: false,
        };
        newBoardList.push(newBoard);
      } else {
        newBoardList.push(board);
      }
    }
    setBoardList(newBoardList);

    updateCardList(boardId, false);
  };

  function updateCardList(boardId, selection) {
    const newCardList = [];
    //want to turn 'selected:' to true for cards that have card.board_id===boardId, and false for the others
    for (const card of cardList) {
      if (card.board_id === boardId && selection === true) {
        const newCard = {
          ...card,
          selected: true,
        };
        newCardList.push(newCard);
      } else {
        const newCard = {
          ...card,
          selected: false,
        };
        newCardList.push(newCard);
      }
    }

    setCardList(newCardList);
  }

  let selectedBoard = {};
  for (const board of boardList) {
    if (board.selected === true) {
      selectedBoard = {
        ...board,
      };
    }
  }

  const updateLike = (cardId, updatedPrice, liked) => {
    const newCardList = [];
    axios
      .patch(`${URL}/cards/${cardId}/${liked}`)
      .then((response) => {
        for (const card of cardList) {
          if (card.id !== cardId) {
            newCardList.push(card);
          } else {
            const newCard = {
              ...card,
              liked: !card.liked,
              likes_count: updatedPrice,
            };
            newCardList.push(newCard);
          }
        }
        setCardList(newCardList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCard = (cardId) => {
    axios
      .delete(`${URL}/cards/${cardId}`)
      .then(() => {
        const newCardList = [];
        for (const card of cardList) {
          if (card.id !== cardId) {
            newCardList.push(card);
          }
        }
        setCardList(newCardList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBoard = (boardId) => {
    axios
      .delete(`${URL}/boards/${boardId}`)
      .then(() => {
        const newBoardList = [];
        for (const board of boardList) {
          if (board.id !== boardId) {
            newBoardList.push(board);
          }
        }
        setBoardList(newBoardList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <h1 className="App-header"> Mindful Moments</h1>
      <div class="container">
        <div id="Board-Title">
          <h2> BOARDS</h2>
          <main className="Boards">
            <BoardList
              boardList={boardList}
              selectBoard={selectBoard}
              unselectBoard={unselectBoard}
              deleteBoard={deleteBoard}
            />
          </main>
        </div>

        <div id="Selected-Board-Title">
          <h2>SELECTED BOARDS</h2>
          <p className="Selected-Boards">
            {selectedBoard.title} - {selectedBoard.owner}
          </p>
        </div>

        <div id="Create-New-Board-Title">
          <h2>CREATE NEW BOARD</h2>
          <div className="New-Boards">
            <NewBoard
              className="New-Boards"
              boardForm={boardForm}
              addBoardCallback={addBoard}
            ></NewBoard>
            <button onClick={() => displayBoardForm(boardForm)}>
              {displayBoardFormText}
            </button>
          </div>
        </div>

        <div id="Cards-For-Title">
          <h2>CARDS FOR {selectedBoard.title}</h2>
          <div className="Cards-For">
            <CardList
              cardList={cardList}
              selectBoard={selectBoard}
              updateLike={updateLike}
              selectedBoard={selectedBoard}
              deleteCard={deleteCard}
            />
          </div>
        </div>
        <div id="Create-New-Card-Title">
          <h2>CREATE NEW CARD</h2>
          <div className="Create-New-Card">
            <NewCard selectedBoard={selectedBoard} addCardCallback={addCard} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
