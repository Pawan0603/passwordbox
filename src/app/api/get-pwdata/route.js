import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
var jsonwebtoken = require('jsonwebtoken');

export const runtime = 'nodejs'; // Correct usage in Next.js 13+

export async function GET(request) {
    await dbconnect();
    try {
        
        const token = request.headers.get('Authorization');
        // const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            return Response.json({ success: false, message: "Token not provided" }, { status: 400 });
        }

        // Verify and decode the token
        const data = jsonwebtoken.verify(token, process.env.jwtSecreat);
        // console.log(data);
        
        const user = await UserModel.aggregate([
            { $match: { email: data.email } },
            { $unwind: '$pwData' },
            // { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', pwData: { $push: '$pwData' } } }
        ])
        // console.log(user);
        

        if (!user) return Response.json({ success: false, message: "Data not found" }, { status: 400 });

        return Response.json({ success: true, message: "Data retrieved successfully",  data: user}, { status: 200 });

    } catch (error) {
        console.error("Error refistering user", error);
        return Response.json(
            {
                success: false,
                message: "Password data fetching error"
            },
            {
                status: 500
            }
        )
    }
}