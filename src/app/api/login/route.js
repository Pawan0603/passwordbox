import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
// import { serialize } from 'cookie';
var jwt = require('jsonwebtoken');

export async function POST(request){
    await dbconnect();
    try {
        const {email, password} = await request.json();
        const user = await UserModel.findOne({email: email});

        console.log(email, password)
    
        if (!user) return Response.json({ success: false, message: "User not found" }, { status: 400 });

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) return Response.json({ success: false, message: "Invalid password" }, { status: 400 });

        var token = jwt.sign({ email: user.email }, process.env.jwtSecreat);
    
        return Response.json({ success: true, message: "User logedIn successfully", token: token }, { status: 200 })


        // // Create a cookie
        // const cookie = serialize('token', 'your_token_here', { // Replace 'your_token_here' with your actual token or session ID
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        //     maxAge: 60 * 60 * 24 * 7, // 1 week
        //     path: '/'
        // });

        // return new Response(JSON.stringify({ success: true, message: "User logged in successfully" }), {
        //     status: 200,
        //     headers: {
        //         'Set-Cookie': cookie,
        //         'Content-Type': 'application/json'
        //     }
        // });

    } catch (error) {
        console.error("Error refistering user", error);
        return Response.json(
            {
                success: false,
                message: "User login error"
            },
            {
                status: 500
            }
        )
    }
}