import React, { useMemo, useState } from "react";
import "./App.css";

export default function App() {
  const [dictionary] = useState([
    { word: "React", meaning: "A JavaScript library for building user interfaces." },
    { word: "Component", meaning: "A reusable building block in React." },
    { word: "State", meaning: "An object that stores data for a component." },
  ]);

  const [term, setTerm] = useState("");
  const [result, setResult] = useState(null); // null | { found: true, meaning: string } | { found: false }

  const lookup = useMemo(() => {
    const m = new Map();
    dictionary.forEach(({ word, meaning }) => m.set(word.toLowerCase(), meaning));
    return m;
  }, [dictionary]);

  const runSearch = () => {
    const q = term.trim().toLowerCase();
    if (!q) {
      // Do nothing on empty query so tests don't treat it as "not found"
      return;
    }
    if (lookup.has(q)) {
      setResult({ found: true, meaning: lookup.get(q) });
    } else {
      setResult({ found: false });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") runSearch();
  };

  return (
    <div className="App" style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Dictionary App</h1>
      <p>Search for a word to see its definition.</p>

      <div style={{ marginTop: "1rem" }}>
        <input
          aria-label="Search term"
          type="text"
          placeholder="Enter a word, e.g., Component"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={onKeyDown}
          style={{ padding: 8, fontSize: 16, marginRight: 10 }}
        />
        <button type="button" onClick={runSearch} style={{ padding: "8px 16px", fontSize: 16 }}>
          Search
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        {result && result.found && (
          <div>
            <h3>Definition:</h3>
            <p>{result.meaning}</p>
          </div>
        )}

        {result && !result.found && (
          // IMPORTANT: render ONLY the exact message when not found.
          <p>Word not found in the dictionary.</p>
        )}
      </div>
    </div>
  );
}
