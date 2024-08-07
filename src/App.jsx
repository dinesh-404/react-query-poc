import { useState } from "react";
import "./App.css";
import Test from "./component/Test";
// import Posts from "./component/posts";

function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <button onClick={() => setToggle(!toggle)}>Click</button>
      {toggle && <Test />}
    </>
  );
}

export default App;
