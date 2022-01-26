import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div class="header">
        <div class="horizontalBar"></div>
        <div>
          <h1 class="title">
            Join <span class="project">Vochaa</span>
          </h1>
          <p class="description">
            Be part of the community by adding new projects, suggesting new
            proposals<br></br> and voting for your favorite proposals using
            quadratic voting systems.
          </p>
        </div>
      </div>
      <div className="cards">
        <div className="card1">
        <Card img="images/avatar1.png" name="Add a Project" desc="Set up Quadratic Voting for a project." button="CREATE"/>
        </div>
        <div className="card2">
        <Card img="images/avatar2.png" name="Explore Projects" desc="Discover the projects and help by voting." button="EXPLORE"/>
        </div>
      </div>

      
    </div>
  );
}

export default App;
