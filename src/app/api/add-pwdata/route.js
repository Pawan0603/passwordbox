import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
var jsonwebtoken = require('jsonwebtoken');

export async function POST(request) {
    await dbconnect();
    try {
        const {token, sideName, identifyar, password, note} = await request.json();
        // decode token and get user data
        const data = jsonwebtoken.verify(token, process.env.jwtSecreat);
    
        const user = await UserModel.findOne({email: data.email});
    
        if (!user) return Response.json({ success: false, message: "User not found" }, { status: 400 });
    
        let newpwData = {sideName: sideName, identifyar: identifyar, password: password, note: note};

        user.pwData.push(newpwData);

        await user.save();

        return Response.json({ success: true, message: "Data saved" }, { status: 200 });

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