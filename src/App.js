import React from "react";
import "./App.css";
import { Home } from "./Home";
import { BookCategory } from "./BookCategory";
import { Book } from "./Book";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">Biblioteka</h3>

        <nav className="navbar navbar-expand-sm bg-light justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item mx-3">
              <NavLink className="btn blue-btn" to="/home">
                Strona główna
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="btn blue-btn" to="/bookcategory">
                Kategorie
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="btn blue-btn" to="/book">
                Książki
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/bookcategory" element={<BookCategory />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
