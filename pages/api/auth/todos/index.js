import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import todoModel from '@/models/Todo'
import UserModel from '@/models/User'

const handler = async (req, res) => {

    const { title, isComplete } = req.body;
    connectToDB();

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "You are not login !!" });
    }

    const tokenPayload = verifyToken(token)

    if (!tokenPayload) {
        return res.status(401).json({ message: "You are not login !!" });
    }

    const user = await UserModel.findOne(
        {
            email: tokenPayload.email
        },
    );

    if (req.method === "GET") {
        const todos = await todoModel.find({ user: user._id })
        return res.json(todos)
    } else if (req.method === "POST") {


        const newTodo = {
            title,
            isComplete,
            user: user._id
        }
        await todoModel.create(newTodo)

        return res.status(201)
            .json({ message: "Todo Created Successfuly :))" })

    } else {
        return false;
    }
}

export default handler;