import React, { useState, useMemo } from "react";
import "./App.css";

function App() {
  const [dictionary, setDictionary] = useState([
    { word: "React", meaning: "A JavaScript library for building user interfaces." },
    { word: "Component", meaning: "A reusable building block in React." },
    { word: "State", meaning: "An object that stores data for a component." },
  ]);

  const [term, setTerm] = useState("");
  const [result, setResult] = useState(null);

  const lookup = useMemo(() => {
    const map = new Map();
    dictionary.forEach(({ word, meaning }) => map.set(word.toLowerCase(), meaning));
    return map;
  }, [dictionary]);

  const runSearch = () => {
    const q = term.trim().toLowerCase();
    if (!q) {
      setResult({ found: false });
      return;
    }
    if (lookup.has(q)) {
      setResult({ found: true, meaning: lookup.get(q) });
    } else {
      setResult({ found: false });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") runSearch();
  };

  return (
    <div className="App">
      <h1>XDictionary</h1>
      <p>Search for a word to see its definition.</p>

      <div>
        <input
          type="text"
          placeholder="Enter a word, e.g., Component"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={runSearch}>Search</button>
      </div>

      <div className="result">
        {result && result.found && (
          <div>
            <h3>Definition:</h3>
            <p>{result.meaning}</p>
          </div>
        )}
        {result && !result.found && (
          <p>Word not found in the dictionary.</p>
        )}
      </div>
    </div>
  );
}

export default App;
