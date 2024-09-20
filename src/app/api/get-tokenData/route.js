var jsonwebtoken = require('jsonwebtoken');

export async function POST(request) {
    try {
        const {token} = await request.json();
        // decode token and get user data
        const data = jsonwebtoken.verify(token, process.env.jwtSecreat);

        return Response.json({ success: true, data: {name: data.name, email: data.email} }, { status: 200 });

    } catch (error) {
        console.error("Error token verifing", error);
        return Response.json(
            {
                success: false,
                message: "Error token verifing"
            },
            {
                status: 500
            }
        )
    }
}