import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
    await dbconnect();
    try {
        const {name, email, password} = await request.json();
        console.log(name, email, password)
        const user = await UserModel.findOne({email: email})
        // console.log("this is a user : ", user)
        if (user) {
            return Response.json({ success: false, message: "email is already use" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        })
        
        await newUser.save();
        console.log("Accound has been created...")
        return Response.json({ success: true, message: "Accound has been created..." }, { status: 200 })
    } catch (error) {
        console.error("Error refistering user", error);
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )

    }
}