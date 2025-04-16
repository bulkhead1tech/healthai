
const { GoogleGenerativeAI } = require("@google/generative-ai");
const handler =async (req, res)=>{
    if(req.body.input!=""){
    try {
              
        const genAI = new GoogleGenerativeAI("AIzaSyCGx3cDeTHgIU9nw7gxZre0gPoa1wgUY_A");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        const input = req.body.input; 
        const prompt = `Please analyze the following DASS scale (0-3) test responses in key value pair first seven belongs to depression, next seven with anxiety and next 7 with stress: ${input}. Based on your analysis, provide a conclusion, advice, and assess whether a PHQ-9 test is necessary give response in 20 words and last only tell PHQ 9 required or not in paragraph format.`;        
        const result = await model.generateContent(prompt, {
                        maxToken:5
          });
        res.json({result})
        
        
        
    } catch (error) {
        console.log(error)
    }}

        



}
export default handler;
