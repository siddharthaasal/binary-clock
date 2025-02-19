
import './index.css'
import { useState, useEffect } from "react";

function App() {

  const [grid, setGrid] = useState(Array(4).fill("").map(() => Array(6).fill("")));
  const [currTime, setCurrTime] = useState("");
  const [currBinaryTime, setCurrBinaryTime] = useState("");

  useEffect(() => {
    intervalCurrTime;
  }, [])

  useEffect(() => {
    updateGrid();
  }, [currBinaryTime])

  const intervalCurrTime = setInterval(updateTimes, 1000);

  function updateTimes() {
    const now = new Date();
    const hrD = now.getHours().toString().padStart(2, '0');
    const minD = now.getMinutes().toString().padStart(2, '0');
    const secD = now.getSeconds().toString().padStart(2, '0');
    const time = hrD + ":" + minD + ":" + secD;
    const h1 = Number(hrD.slice(0, 1)).toString(2).padStart(4, '0');
    const h2 = Number(hrD.slice(1)).toString(2).padStart(4, '0');
    const m1 = Number(minD.slice(0, 1)).toString(2).padStart(4, '0');
    const m2 = Number(minD.slice(1)).toString(2).padStart(4, '0');
    const s1 = Number(secD.slice(0, 1)).toString(2).padStart(4, '0');
    const s2 = Number(secD.slice(1)).toString(2).padStart(4, '0');
    const binaryTime = h1 + " " + h2 + ":" + m1 + " " + m2 + ":" + s1 + " " + s2;
    setCurrTime(time);
    setCurrBinaryTime(binaryTime);
  }

  function updateGrid() {
    const h1 = currBinaryTime.slice(0, 4);
    const h2 = currBinaryTime.slice(5, 9);
    const m1 = currBinaryTime.slice(10, 14);
    const m2 = currBinaryTime.slice(15, 19);
    const s1 = currBinaryTime.slice(20, 24);
    const s2 = currBinaryTime.slice(25, 29);

    //hr
    for (var i = 0; i < 4; i++) {
      grid[i][0] = h1.charAt(i);
    }
    for (var i = 0; i < 4; i++) {
      grid[i][1] = h2.charAt(i);
    }

    //min
    for (var i = 0; i < 4; i++) {
      grid[i][2] = m1.charAt(i);
    }
    for (var i = 0; i < 4; i++) {
      grid[i][3] = m2.charAt(i);
    }

    //sec
    for (var i = 0; i < 4; i++) {
      grid[i][4] = s1.charAt(i);
    } for (var i = 0; i < 4; i++) {
      grid[i][5] = s2.charAt(i);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold underline">   Binary Clock  </h1>

      <h3>Time : {currTime}</h3>
      <h3>Binary Time : {currBinaryTime}</h3>

      <div className="inline-grid grid-cols-6 gap-3 p-5 bg-gray-800">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-10 h-10 flex rounded-md 
          ${(cell == 1) ? "bg-green-500" : "bg-gray-100"} transition-all`}
            >

            </div>
          ))
        )}
      </div>

    </>
  )
}

export default App
