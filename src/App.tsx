
import './index.css'
import { useState, useEffect } from "react";

function App() {

  const [grid, setGrid] = useState(Array(4).fill("").map(() => Array(6).fill("")));
  const [currTime, setCurrTime] = useState("");
  const [currBinaryTime, setCurrBinaryTime] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    updateGrid();
  }, [currBinaryTime])

  function updateTimes() {
    const now = new Date();

    const hr = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    const sec = now.getSeconds().toString().padStart(2, '0');
    const time = hr + ":" + min + ":" + sec;

    const binaryTime = [hr, min, sec].flatMap((unit) =>
      unit.split("").map((digit) => Number(digit).toString(2).padStart(4, '0'))
    );

    setCurrTime(time);
    setCurrBinaryTime(binaryTime);
  }

  function updateGrid() {
    const newGrid = Array(4).fill("").map(() => Array(6).fill(""));

    currBinaryTime.forEach((binary: any, col: any) => {
      binary.split("").forEach((bit: any, row: any) => {
        newGrid[row][col] = bit;
      });
    });

    setGrid(newGrid);
  }

  return (
    <>

      <div className="relative h-screen">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">

            <h1 className="text-2xl font-bold underline font-montserrat">   Binary Clock  </h1>

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

          </div>
        </div>
      </div>

    </>
  )
}

export default App
