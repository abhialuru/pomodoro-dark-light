import Home from "./components/Home";
import Context from "./Context";

function App() {
  return (
    <Context>
      <div>
        <Home />
      </div>
    </Context>
  );
}

export default App;
