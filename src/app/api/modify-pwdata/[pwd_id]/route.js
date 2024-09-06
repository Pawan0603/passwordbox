import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
var jwt = require('jsonwebtoken');

export async function PUT(request, { params }) {  // Change to PUT for updating
    await dbconnect();
    try {
        const token = request.headers.get('Authorization');
        if (!token) {
            return Response.json({ success: false, message: "User not authenticet" }, { status: 400 });
        }

        // Verify and decode the token
        const user = jwt.verify(token, process.env.jwtSecreat);

        const pwd_id = params.pwd_id;

        // Extract the new data from the request body
        const {sideName, identifyar, password, note} = await request.json();

        const newPasswordData = {sideName: sideName, identifyar: identifyar, password: password, note: note }
        console.log("newPasswordData", newPasswordData)

        const updateResult = await UserModel.updateOne(
            { email: user.email, "pwData._id": pwd_id },
            { $set: { "pwData.$": newPasswordData } }  // Update the specific password data
        );
        console.log(updateResult);
        

        if (updateResult.modifiedCount == 0) {
            return Response.json({
                success: false,
                message: "Password data not found or not updated",
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Password Updated",
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating password data", error);
        return Response.json(
            {
                success: false,
                message: "Error updating password data"
            },
            {
                status: 500
            }
        );
    }
}
