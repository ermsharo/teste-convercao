import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Header from "./components/Header";
import Board from "./components/Board";
import SingIn from "./components/SingIn";

const AppBox = styled.div`
  min-height: 100vh;

  input {
    font-family: "Varela Round", sans-serif;
  }

  a {
    font-family: "Varela Round", sans-serif;
    font-weight: 700;
  }
`;

function App() {
  return (
    <AppBox>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dart converter</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <link
          href="http://fonts.cdnfonts.com/css/sedgwick-ave"
          rel="stylesheet"
        />
        <link href="http://fonts.cdnfonts.com/css/helmida" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Varela+Round&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Board />}></Route>
            <Route path="/dart-converter/sign-in" element={<SingIn />}></Route>
            <Route path="/dart-converter/home" element={<Board />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppBox>
  );
}

export default App;
