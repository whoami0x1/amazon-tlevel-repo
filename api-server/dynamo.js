const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { EncryptionConfiguration$ } = require("@aws-sdk/client-s3");
const {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand
} = require("@aws-sdk/lib-dynamodb");
require("dotenv").config(); 
const jwt = require("jsonwebtoken");
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');

const ddbClient = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.LOGGER_ACCESS_KEY,
        secretAccessKey: process.env.LOGGER_SECRET_KEY
    }
});

const ddb = DynamoDBDocumentClient.from(ddbClient);

async function logData(req, res, data) {
    console.log("logData called")
    const token = req.cookies.id_token;

    if (!token) {
        return { error: "Not authenticated" };
    }
    console.log("Token gathered")

    try {
        console.log("Decoing payload")
        const payload = jwt.decode(token);
        console.log("Payload decoded.")

        if (!payload) {
            return { error: "Invalid token" };
        }
        console.log("Token valid")

        username = payload['cognito:username'] || payload.username;
        email = payload.email;
    } catch (err) {
        return { error: "Token parse failed" };
    }

    try {
        id = uuidv4()

        console.log(`Sending data to AWS Dynamo: ${data} by ${username}`)
        await ddb.send(
            new PutCommand({
                TableName: "logging",
                Item: {
                    logID: id,
                    email: email,
                    loggedAt: new Date().toISOString(),
                    username: username,
                    data: data
                }
            })
        );

        return res.json({ success: true });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "DynamoDB write failed" });
    }
}

async function submitEOI(req, res, data) {
    const token = req.cookies.id_token;

    if (!token) {
        return { error: "Not authenticated" };
    }

    let userid;
    try {
        const payload = jwt.decode(token);

        if (!payload) {
            return { error: "Invalid token" };
        }

        userid = payload.sub; // no `const` — assigns to outer variable
    } catch (err) {
        return { error: "Token parse failed" };
    }

    let EOIid, EOIname, EOIemail, EOIcourse, EOIdetails;
    try {
        console.log(data);
        if (!data || Object.keys(data).length === 0) return { error: "No data provided" };

        EOIid = uuidv4();
        EOIname = data.name;
        EOIemail = data.email;
        EOIcourse = data.courses;
        EOIdetails = data.details;
    } catch (err) {
        console.log(err);
        return { error: "Failed to parse EOI args" };
    }

    try {
        console.log("About to insert:", { EOIid, EOIname, EOIemail, EOIcourse, EOIdetails });
        await ddb.send(
            new PutCommand({
                TableName: "expressionOfInterests",
                Item: {
                    ID: EOIid,
                    userID: userid,
                    email: EOIemail,
                    name: EOIname,
                    course: EOIcourse,
                    details: EOIdetails,
                    createdAt: new Date().toISOString(),
                }
            })
        );

        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "DynamoDB write failed" });
    }
}

module.exports = {
    logData, submitEOI
};