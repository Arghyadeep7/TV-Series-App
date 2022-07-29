import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TvSeriesComponent from "./components/TvSeriesComponent";
import TvSeriesDetail from "./components/TvSeriesDetail";
import SearchQuery from "./components/SearchQuery";
import SeasonComponent from "./components/SeasonComponent";
import EpisodeComponent from "./components/EpisodeComponent";

import Container from "react-bootstrap/Container";

function App() {

  return (
    <Container>
      <Header/>
      <Routes>
        <Route
          path="/"
          element={<Navigate replace to="/tv/trending" />}
        />
        <Route path="/tv/popular" element={<TvSeriesComponent type="popular"/>} />
        <Route path="/tv/top_rated" element={<TvSeriesComponent type="top_rated"/>} />
        <Route path="/tv/trending" element={<TvSeriesComponent type="trending"/>} />
        <Route path="/tv/:id" element={<TvSeriesDetail />} />
        <Route path="/tv/:id/season/:season_num" element={<SeasonComponent />} />
        <Route path="/tv/:id/season/:season_num/episode/:episode_num" element={<EpisodeComponent />} />
        <Route path="/search/:query" element={<SearchQuery />} />
        <Route path="*" element={<h1>Error, this page doesnot exist !</h1>} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
