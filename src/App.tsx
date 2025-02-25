import "./index.css";
import { useState, useEffect } from "react";

function App() {
  const [grid, setGrid] = useState(
    Array(4)
      .fill("")
      .map(() => Array(6).fill(""))
  );
  const [currTime, setCurrTime] = useState("");
  const [currBinaryTime, setCurrBinaryTime] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateGrid();
  }, [currBinaryTime]);

  function updateTimes() {
    const now = new Date();
    const hr = now.getHours().toString().padStart(2, "0");
    const min = now.getMinutes().toString().padStart(2, "0");
    const sec = now.getSeconds().toString().padStart(2, "0");
    const time = hr + ":" + min + ":" + sec;

    const binaryTime = [hr, min, sec].flatMap((unit) =>
      unit.split("").map((digit) => Number(digit).toString(2).padStart(4, "0"))
    );

    setCurrTime(time);
    setCurrBinaryTime(binaryTime);
  }

  function updateGrid() {
    const newGrid = Array(4)
      .fill("")
      .map(() => Array(6).fill(""));

    currBinaryTime.forEach((binary: any, col: any) => {
      binary.split("").forEach((bit: any, row: any) => {
        newGrid[row][col] = bit;
      });
    });

    setGrid(newGrid);
  }

  return (
    <>
      <div className="min-h-screen bg-[#020202] flex flex-col items-center p-4 font-['Press_Start_2P']">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-4xl text-[#06b347] uppercase tracking-wider mt-8 sm:mt-12">
          Binary Clock
        </h1>

        <div className="relative flex flex-col items-center mx-auto mt-8 sm:mt-12 p-3 sm:p-4">
          {/* Binary Clock Frame with Bezel */}
          <div className="border-4 border-[#04471c] bg-black shadow-xl rounded-md pt-3 pb-3 px-3 sm:pt-5 sm:pb-5 sm:px-5 relative">
            {/* Inner Display */}
            <div className="border-2 border-[#06632c] bg-black shadow-lg rounded-sm p-3 sm:p-4">
              {/* Grid Display */}
              <div className="grid grid-cols-6 gap-1 sm:gap-2 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-6 h-6 sm:w-8 sm:h-8 transition-all shadow-sm rounded-sm 
                      ${cell == "1" ? "bg-green-700" : "bg-[#868687]"}`}
                    />
                  ))
                )}
              </div>

              {/* Digital Time Display */}
              <div className="mt-1 sm:mt-2 flex justify-center text-[#06b347] tracking-widest text-sm sm:text-md font-light">
                {currTime}
              </div>
            </div>
          </div>

          {/* Simple Base */}
          <div className="w-40 sm:w-56 h-4 sm:h-5 bg-[#04471c] border-2 border-[#06632c] border-t-0 mt-0 shadow-md rounded-b-none"></div>
        </div>

        <div className="mt-4 sm:mt-6 text-sm sm:text-base text-[#06b347] underline cursor-pointer hover:text-green-600">
          <a
            href="https://medium.com/@siddharthaasal/understanding-time-in-binary-f7ab6ea5f5b0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Behind the Code →
          </a>
        </div>

        <footer className="w-full relative mt-12 sm:mt-24 bg-[#020202] text-center text-gray-400 text-xs sm:text-sm font-light p-2 sm:p-4">
          <p className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4">
            <a
              href="https://github.com/SiddharthAasal/binary-clock"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:underline"
            >
              GitHub Repo
            </a>
            <span>
              © 2025{" "}
              <a
                href="https://www.linkedin.com/in/siddharthaasal/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:underline"
              >
                Siddharth Aasal
              </a>
            </span>
            <span>MIT Licensed</span>
          </p>
        </footer>

      </div>
    </>
  );

}

export default App;