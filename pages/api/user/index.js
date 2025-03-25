import User from "@/models/user";
import { connectdb } from "@/utils/mongoose"

const handler =async (req, res)=>{
    try {
        await connectdb();
        const att = await User.find()

        if(att){
            res.json({
                data: att,
            });
        }
        else{
            res.json({
                data: "No User!",
            });
        }
        
    } catch (error) {
        console.log(error)
    }
        



}
export default handler;