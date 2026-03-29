import { useState } from "react";
import scissorsImg from "./photo/s.png";
import rockImg from "./photo/r.png";
import paperImg from "./photo/p.png";
import blankImg from "./photo/blank.png";
import "./index.css";

function ListShow() {
  const [opponentScore, setOpponentScore] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [opponentMove, setOpponentMove] = useState(null);
  const [userMove, setUserMove] = useState(null);
  const [winner, setWinner] = useState(<p>Choose one</p>);

  function setFunction(myMove) {
    setUserMove(myMove);

    if (opponentScore >= 3 || myScore >= 3) {
      reset();
      return;
    }

    const r = Math.floor(Math.random() * 3);
    setOpponentMove(r);

    let opponent = opponentScore;
    let my = myScore;

    if (r !== myMove) {
      if (r === 0) {
        if (myMove === 1) my++;
        else if (myMove === 2) opponent++;
      } else if (r === 1) {
        if (myMove === 0) opponent++;
        else if (myMove === 2) my++;
      } else if (r === 2) {
        if (myMove === 0) my++;
        else opponent++;
      }
    }

    setMyScore(my);
    setOpponentScore(opponent);

    if (opponent === 3 || my === 3) {
      if (my < opponent) {
        setWinner(<p className="bg-red-200">You Lose</p>);
        window.alert("You Lose...");
      } else {
        setWinner(<p className="bg-green-200">You Win</p>);
        window.alert("You Win...");
      }
    }
  }

  function GiveMove(n) {
    let imgSrc = blankImg;
    let altText = "blank";

    if (n === 0) {
      imgSrc = rockImg;
      altText = "rock";
    } else if (n === 1) {
      imgSrc = paperImg;
      altText = "paper";
    } else if (n === 2) {
      imgSrc = scissorsImg;
      altText = "scissors";
    }

    return (
      <div className="flex justify-center">
        <img src={imgSrc} alt={altText} className="h-40" />
      </div>
    );
  }

  function UGiveMove(n) {
    let imgSrc = blankImg;
    let altText = "blank";

    if (n === 0) {
      imgSrc = rockImg;
      altText = "rock";
    } else if (n === 1) {
      imgSrc = paperImg;
      altText = "paper";
    } else if (n === 2) {
      imgSrc = scissorsImg;
      altText = "scissors";
    }

    return (
      <div className="flex justify-center h-40">
        <img src={imgSrc} alt={altText} />
      </div>
    );
  }

  function reset() {
    setMyScore(0);
    setOpponentScore(0);
    setOpponentMove(null);
    setUserMove(null);
    setWinner(<p>Choose one</p>);
  }

  return (
    <div className="text-center p-4 bg-white text-gray-900 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        Opponent Score: {opponentScore}
      </h1>

      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
        <div className="border rounded-md shadow p-4 md:w-1/2 bg-yellow-100">
          <h1 className="text-lg md:text-xl font-semibold mb-2">
            Opponent Move
          </h1>
          {GiveMove(opponentMove)}
        </div>

        <div className="border rounded-md shadow p-4 md:w-1/2 bg-yellow-100">
          <h1 className="text-lg md:text-xl font-semibold mb-2">
            Your Move
          </h1>
          {UGiveMove(userMove)}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        {[0, 1, 2].map((move) => {
          const isSelected = userMove === move;

          const colors = isSelected
            ? "bg-yellow-700 hover:bg-yellow-800"
            : "bg-yellow-300 hover:bg-yellow-400";

          const imgSrc =
            move === 0 ? rockImg : move === 1 ? paperImg : scissorsImg;

          const altText =
            move === 0 ? "rock" : move === 1 ? "paper" : "scissors";

          return (
            <button
              key={move}
              onClick={() => setFunction(move)}
              className={`${colors} transform hover:scale-110 transition-all duration-300 p-4 shadow-lg`}
            >
              <img src={imgSrc} alt={altText} className="w-20 md:w-24 lg:w-28" />
            </button>
          );
        })}
      </div>

      <h1 className="text-lg md:text-xl mt-4">My Score: {myScore}</h1>
      <h1 className="text-lg md:text-xl font-bold mt-2">{winner}</h1>

      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Reset
      </button>
    </div>
  );
}

function App() {
  return (
    <div>
      <ListShow />
    </div>
  );
}

export default App;