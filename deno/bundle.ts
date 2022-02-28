// bundle.jsの有無
export default (src: String) => {
    try{
        return Deno.readFile(`./react/${src}`);
    }catch(e){
        console.log(e);
    }
}