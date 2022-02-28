import { React } from '../deno/deps.ts';
import { twind } from '../deno/deps.ts';
import { v4 } from '../deno/deps.ts';
import ChatList from './components/ChatList.jsx';

const App = () => {
    const client = new WebSocket("ws://localhost:8080/ws");

    const [id, setId] = React.useState(null);

    const uuid = () => {
        // Generate a v4 uuid.
        const myUUID = v4.generate();

        // Validate a v4 uuid.
        const isValid = v4.validate(myUUID);

        if(isValid){
            setId(myUUID)
        }else{
            uuid()
        }
    }

    if(id == null){
        uuid()
    }

    return (
        <ChatList id={id} client={client} />
    )
};
  
export default App;