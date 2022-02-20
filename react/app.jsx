import { React } from "../deno/deps.ts";
import { twind } from "../deno/deps.ts";

const App = () => {
    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        fetch('http://localhost:8080/api', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setPosts(data.test)
        })
    },[])

    return (
        <div class={twind.tw`text-red-400`}>
            {posts}
        </div>
    )
};
  
export default App;