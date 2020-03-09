import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { selectQuotes } from "./reducers/quotesSlice";
import fetchQuote from "./api/fetchRandomQuote";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const quotesData = useSelector(selectQuotes);
  console.log(quotesData);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        {quotesData.quotes.map(quote => (
          <p>{quote.content} <br/> By: {quote.author}</p>
        ))}

        <span>
          <span
            onClick={() => {
              dispatch(fetchQuote);
            }}
          >
            Learn{" "}
          </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
