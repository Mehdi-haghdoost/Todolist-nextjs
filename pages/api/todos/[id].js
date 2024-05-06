import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import todoModel from '@/models/Todo'
import UserModel from '@/models/User'

const handler = async (req, res) => {
    connectToDB();

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "You are not login !!" });
    }

    const tokenPayload = verifyToken(token)

    if (!tokenPayload) {
        return res.status(401).json({ message: "You are not login !!" });
    }

    if (req.method === 'DELETE') {

        try {
            const { id } = req.query;
            await todoModel.findOneAndDelete({ _id: id })
            return res.json({ message: "Todo Removed Successfully :))" })
        } catch (error) {
            return res.status(500).json({ message: "Unknow Internal Server Error !!" })
        }

    }

}

export default handler;