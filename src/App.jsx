import MovieList from "./components/MovieList";
import NavBar from "./components/NavBar"
import './style.scss';
function App() {

  return (
    <div>
      <NavBar />
      <h1 className="title-app">Minha pagina App</h1>
      <MovieList />
    </div>
  )
}

export default App
