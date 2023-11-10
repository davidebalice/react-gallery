import React, { useState } from "react";
import Header from "./common/Header";
import Gallery from "./components/Gallery";
import Masonry from "./components/Masonry";
import Slideshow from "./components/Slideshow";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [type, setType] = useState("Gallery");

  return (
    <div className="App">
      <Header setType={setType} />  
      {type === "Gallery" ? (
        <>
          <Gallery />
        </>
      ) : type === "Masonry" ? (
        <>
          <Masonry />
        </>
      ) : (
        <>
          <Slideshow />
        </>
      )}
    </div>
  );
}

export default App;
