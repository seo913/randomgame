import { useEffect, createContext, useState } from "react";
import GameBoard from "./components/GameBoard";
import GameResult from "./components/GameResult";

export  const AppContext = createContext();

function App() {
  const [point, setPoint] =useState(0);

  useEffect(() => {
    let savedPoint = localStorage.getItem("point"); //처음 게임을 시작하는 사람을 위해

    if(!savedPoint){ //시작하는사람이 없으면
      localStorage.setItem("point",0);
    }
  },[])

  return (
    <AppContext.Provider value={{point, setPoint}}>
    <div className="flex flex-col justify-center items-center min-h-screen">
      <GameResult />
      <GameBoard />
    </div>
    </AppContext.Provider>
  );
}

export default App;
