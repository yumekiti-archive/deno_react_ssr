import { React } from "./deps.ts";

const App = () => {
    const [count, setCount] = React.useState(0);
  
    return (
        <div>
            <h1>Hello DenoLand!</h1>
            <button onClick={() => setCount(count + 1)}>Click the &#129429;</button>
            <p>You clicked the &#129429; {count} times</p>
        </div>
    );
};
  
export default App;