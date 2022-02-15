import { React } from "./deps.ts";

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
        <div>
            {posts}
        </div>
    )
};
  
export default App;