'use client'
import { useState, useEffect } from 'react';

const Reader = () => {
  const [text, setText] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [wpm, setWpm] = useState(200); // Words per minute

  useEffect(() => {
    const speed = 60000 / wpm; // Calculate the interval for each word

    function startReading(wordsArray: string[]) {
      if (wordsArray.length === 0) {
        setIsReading(false);

        return;
      }
      setCurrentWord(wordsArray[0]);
      setTimeout(() => {
        startReading(wordsArray.slice(1));
      }, speed);
    }

    if (isReading && words.length > 0) {
      startReading(words);
    }
  }, [isReading, words, wpm]);


  const handleStart = () => {
    setWords(text.split(' '));
    setIsReading(true);
  };

  const handleStop = () => {
    setIsReading(false);
  };

  const handleClear = () => { 
    setText('');
    setCurrentWord('');
    setWords([]);
    setIsReading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
    <h1 className="text-2xl md:text-4xl font-bold mb-4">Speed Reading Application</h1>
    <div className="p-6 bg-white shadow-md rounded-md w-2/3">
      <div className="relative h-64 overflow-hidden">
        {isReading ? (
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-700">
            {currentWord}
          </div>
        ) : (
          <textarea 
            className="w-full h-full p-2 mb-4 border-gray-300 rounded-md" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here"
          />
        )}
      </div>
      { !isReading && (
        <div className="mt-4 flex space-x-4">
          <button 
            className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
            onClick={handleStart}
          >
            Start
          </button>
          <button 
            className="px-4 py-2 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700"
            onClick={handleClear} 
          >
            Clear
          </button>
          <div className="self-center text-2xl font-semibold">
            <label htmlFor="wpm">WPM: </label>
            <input 
              id="wpm" 
              type="number" 
              min="10"
              max="1000"
              value={wpm} 
              onChange={(e) => setWpm(Number(e.target.value))} 
            />
          </div>
        </div>
      )}
      { isReading && (
        <button 
          className="mt-4 px-4 py-2 font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700"
          onClick={handleStop}
        >
          Stop
        </button>
      )}
    </div>
  </div>
  );
}

export default Reader;

