import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Apropos from "./pages/Apropos";
import Series from "./pages/Series";
import VieEtudiante from "./pages/VieEtudiante";
import Galerie from "./pages/Galerie";
import Actualites from "./pages/Actualites";
import Inscription from "./pages/Inscription";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<Apropos />} />
            <Route path="/series" element={<Series />} />
            <Route path="/vie-etudiante" element={<VieEtudiante />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
