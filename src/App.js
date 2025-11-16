import React, { useMemo, useState } from "react";
import "./App.css";

export default function App() {
  const [dictionary] = useState([
    { word: "React", meaning: "A JavaScript library for building user interfaces." },
    { word: "Component", meaning: "A reusable building block in React." },
    { word: "State", meaning: "An object that stores data for a component." },
  ]);

  const [term, setTerm] = useState("");
  const [definitionText, setDefinitionText] = useState(""); // always shown under <h3>Definition:</h3>

  const lookup = useMemo(() => {
    const map = new Map();
    dictionary.forEach(({ word, meaning }) => map.set(word.toLowerCase(), meaning));
    return map;
  }, [dictionary]);

  const runSearch = () => {
    const q = term.trim().toLowerCase();
    if (!q) {
      setDefinitionText("Word not found in the dictionary.");
      return;
    }
    if (lookup.has(q)) {
      setDefinitionText(lookup.get(q));
    } else {
      setDefinitionText("Word not found in the dictionary.");
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
        <h3>Definition:</h3>
        <p>{definitionText}</p>
      </div>
    </div>
  );
}
