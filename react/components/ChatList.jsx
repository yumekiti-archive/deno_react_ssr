import ChatItem from "./ChatItem.jsx";
import { twind } from '../../deno/deps.ts';

export default ({chats, message, handleChange, handleSubmit}) => {
    return (
        <div class={twind.tw`flex`}>
            <div class={twind.tw`container mx-auto my-auto justify-center`}>
                <div class={twind.tw`mt-5 mx-auto max-w-xl border rounded`}>
                    <div class={twind.tw`relative flex items-center p-3 border-b border-gray-300`}>
                        <span class={twind.tw`block ml-2 font-bold text-gray-600`}>Chat</span>
                    </div>

                    <div class={twind.tw`relative w-full p-6 overflow-y-auto h-[40rem]`}>
                        <ul class={twind.tw`space-y-2`}>

                            {
                                chats.map((chat) => {
                                    return (
                                        <ChatItem id={chat.id} body={chat.body} />
                                    );
                                })
                            }

                        </ul>
                    </div>

                    <form class={twind.tw`flex items-center justify-between w-full p-3 border-t border-gray-300`} onSubmit={handleSubmit}>
                        <input type="text" value={message} onChange={handleChange} placeholder="Message" class={twind.tw`block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700`} name="message" required />
                        <button type="submit">
                            <svg class={twind.tw`w-5 h-5 text-gray-500 origin-center transform rotate-90`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}