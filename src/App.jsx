import "./styles/reset.css";
import Header from "./components/header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Maker from "./pages/Maker";
import Play from "./pages/Play";

function App() {
    return (
        <>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/maker" element={<Maker />} />
                <Route path="/item/:id" element={<Play />} />
            </Routes>
            <Footer></Footer>
        </>
    );
}

export default App;
