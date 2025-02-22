
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
      <div className="min-h-screen bg-[#020202] flex flex-col items-center ">

        {/* Title */}
        <h1 className="text-4xl font-mono text-[#06b347] uppercase tracking-wide mt-24
                ">
          Binary Clock
        </h1>

        {/* Binary Clock Container */}
        <div className="relative flex flex-col items-center mx-auto mt-12 p-4">

          {/* Binary Clock Frame */}
          <div className="grid grid-cols-6 gap-2 p-4 border-2 border-[#06632c] bg-black shadow-lg rounded-sm">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-8 h-8 transition-all shadow-sm rounded-sm 
              ${cell == 1 ? "bg-green-700" : "bg-[#868687]"}`}
                />
              ))
            )}
          </div>

          {/* Digital Time Display - Outside the Box */}
          <div className="mt-6 text-4xl font-mono text-[#06b347] tracking-wider">
            {currTime}
          </div>

        </div>

        <div className="mt-6 text-lg text-[#06b347] underline cursor-pointer hover:text-green-600">
          <a href="https://medium.com/your-blog-link" target="_blank" rel="noopener noreferrer">
            Behind the Code: Read on Medium →
          </a>
        </div>

        <footer className="w-full relative mt-24 bg-[#020202] text-center text-gray-400 text-sm">
          <p className='flex justify-center gap-4'>
            <a href="https://github.com/SiddharthAasal/binary-clock" target="_blank" rel="noopener noreferrer"
              className="text-green-500 hover:underline ml-2 font-mono">GitHub Repo</a>
            <span className='font-mono'>© 2025 <a href="https://github.com/SiddharthAasal" target="_blank" rel="noopener noreferrer"
              className="text-green-500 hover:underline font-mono">Siddharth Aasal</a>  </span>

            <span className="ml-2 font-mono">MIT Licensed</span>
          </p>
        </footer>






      </div>





    </>
  )
}

export default App
