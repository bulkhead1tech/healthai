
const { GoogleGenerativeAI } = require("@google/generative-ai");
const handler =async (req, res)=>{
    if(req.body.input!=""){
    try {

        const genAI = new GoogleGenerativeAI("AIzaSyCGx3cDeTHgIU9nw7gxZre0gPoa1wgUY_A");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        const input = await req.body.input; 
        const   prompt = "respond as a medical assistant for the prompt in paragraph format:" + input;
        const result = await model.generateContent(prompt, {
            maxTokens: 50,
          });
        res.json({result})
        
        
        
    } catch (error) {
        console.log(error)
    }}

        



}
export default handler;
