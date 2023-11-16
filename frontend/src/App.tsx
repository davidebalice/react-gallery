import React, { useState } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Wrapper from "./common/Wrapper";
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
      <Wrapper>
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
       </Wrapper>
      <Footer />
    </div>
  );
}

export default App;
