import { React } from '../deno/deps.ts';
import { twind } from '../deno/deps.ts';
import { v4 } from '../deno/deps.ts';
import ChatList from './components/ChatList.jsx';

const App = () => {
    const client = new WebSocket("ws://localhost:8080/ws");

    const [chats, setChats] = React.useState([]);
    const [message, setMessage] = React.useState([]);
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

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: id,
            body: message,
        };
        client.send(JSON.stringify(data));
        setMessage('');
    }

    client.addEventListener("message", ({data}) => {
        let json = JSON.parse(data);
        setChats((chats) => [...chats, {id: json.id, body: json.body} ]);
    })

    return (
        <ChatList chats={chats} message={message} handleChange={handleChange} handleSubmit={handleSubmit} />
    )
};
  
export default App;