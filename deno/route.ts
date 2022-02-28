export default (request: any, method: String, url: String, status: Number, headers: any, body: any) => {
    if(request.method === method && request.url === url){
        request.respond({
            status: status,
            headers: new Headers(headers),
            body: body,
        });
    }
}