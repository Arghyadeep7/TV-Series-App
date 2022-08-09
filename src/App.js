import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";



function App() {

  return (
    <Container>
      <Routes>
        <Route path="*" element={
          <>
            <br/>
            <h1>The TV SERIES App has been shifted&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://e-hub-arghyadeep7.vercel.app/">here</a></h1>
            <h2><a href="https://e-hub-arghyadeep7.vercel.app/">https://e-hub-arghyadeep7.vercel.app/</a></h2>
          </>
        } />
      </Routes>
    </Container>
  );
}

export default App;
