import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
var jwt = require('jsonwebtoken');


export async function DELETE(request, { params }) {
    await dbconnect();
    try {
        const token = request.headers.get('Authorization');
        if (!token) {
            return Response.json({ success: false, message: "User not authenticet" }, { status: 400 });
        }

        // Verify and decode the token
        const user = jwt.verify(token, process.env.jwtSecreat);

        const pwd_id = params.pwd_id;

        const updateResult = await UserModel.updateOne(
            {email: user.email},
            {$pull: {pwData: {_id: pwd_id}}}
        )

        if (updateResult.modifiedCount == 0) {
            return Response.json({
                success: false,
                message: "Password data not fund or already delete",
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            message: "Password Deleted",
        }, { status: 200 })
        


    } catch (error) {
        console.error("Error deleting message", error);
        return Response.json(
            {
                success: false,
                message: "Error deleting message"
            },
            {
                status: 500
            }
        )
    }
}