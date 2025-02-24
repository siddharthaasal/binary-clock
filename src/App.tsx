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
    <div className="bg-black min-h-screen flex items-center justify-center">
      {/* Vintage Computer Background */}
      <div className="relative flex items-center justify-center min-h-screen bg-black">
        <img 
          src="/Retro2.png" 
          alt="Retro Computer"
          style={{ transform: "scale(1.0)" }}
          className="w-[50%] transform scale-100"
        />
        {/* Title*/}
        <h1 className='absolute top-14 left-1/2 -translate-x-1/2 text-green-400 font-mono'
          style={{ fontSize: "3rem", lineHeight: "1.0"}}>
        BINARY CLOCK
        </h1>
        {/* Binary Clock Screen */}
        <div className="absolute top-[21%] left-[37%] w-[26%] h-[39%] bg-black border-2 border-[#06b347] flex flex-col items-center justify-center">
          {/* Binary Grid */}
          <div className="grid grid-cols-6 gap-2 p-4">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-10 h-10 transition-all shadow-sm rounded-sm 
                    ${cell == 1 ? "bg-green-700" : "bg-[#868687]"}`}
                />
              ))
            )}
          </div>

          {/* Digital Time Display */}
          <div className="mt-2 text-2xl font-mono text-[#06b347] tracking-wider">
            {currTime}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 text-center text-sm text-gray-400 w-full">
        <a href="#" className="text-green-400 underline hover:text-green-400 font-mono">
          Behind the Code: Read on Medium →
        </a>
        <div className="mt-2 font-mono">
          <a href="https://github.com/SiddharthAasal/binary-clock" className="text-green-500 hover:underline">
            GitHub Repo
          </a>  &copy; 2025 Siddharth Aasal | MIT Licensed
        </div>
      </footer>
    </div>
  );
}

export default App

