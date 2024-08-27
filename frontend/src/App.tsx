import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Wrapper from "./common/Wrapper";
import Gallery from "./components/Gallery";
import { Gallery3d } from "./components/Gallery3d";
import Masonry from "./components/Masonry";
import Slideshow from "./components/Slideshow";

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
        ) : type === "Slideshow" ? (
          <>
            <Slideshow />
          </>
        ) : (
          <Gallery3d />
        )}
      </Wrapper>
      <Footer />
    </div>
  );
}

export default App;
