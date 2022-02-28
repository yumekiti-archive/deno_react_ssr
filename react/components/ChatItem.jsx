import { React } from '../../deno/deps.ts';
import { twind } from '../../deno/deps.ts';

export default ({ id, body }) => {
    return (
        <li class={id == id ? twind.tw`flex justify-start` : twind.tw`flex justify-end`}>
            <div class={id == id ? twind.tw`relative max-w-xl px-4 py-2 text-gray-700 rounded shadow` : twind.tw`relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow`}>
                <span class={twind.tw`text-xs`}>id : { id }</span>
                <span class={twind.tw`block`}>{ body }</span>
            </div>
        </li>
    )
}