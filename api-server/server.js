const express = require("express");
const axios = require("axios");
const qs = require("querystring");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require('./logger')

require("dotenv").config(); 

// S3 imports
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const app = express();
const PORT = 5501;

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5500",
    credentials: true
}));

const s3 = new S3Client({ region: process.env.AWS_REGION });

const CLIENT_ID = process.env.COGNITO_CLIENT_ID;
const REDIRECT_URI = "http://localhost:5501/api/cognitoCallback";

const COGNITO_DOMAIN = process.env.COGNITO_DOMAIN;

const jwt = require("jsonwebtoken");
const { configDotenv } = require("dotenv");

function requireAuth(req, res, next) {
    const token = req.cookies.id_token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    try {
        jwt.decode(token);
        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}

app.get("/api/me", (req, res) => {
    const idToken = req.cookies.id_token;

    if (!idToken) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    try {
        const payload = jwt.decode(idToken);

        if (!payload) {
            return res.status(401).json({ error: "Invalid token" });
        }

        return res.json({
            user: {
                sub: payload.sub,
                email: payload.email,
                username: payload["cognito:username"] || payload.username
            }
        });

    } catch (err) {
        return res.status(401).json({ error: "Token parse failed" });
    }
});
    
app.post("/api/logout", (req, res) => {
  res.clearCookie("id_token");
  res.redirect('http://localhost:5500/logout-success.html')
});

app.get("/api/cognitoCallback", async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).send("Missing code");
    }

    try {
        const tokenResponse = await axios.post(
            `${COGNITO_DOMAIN}/oauth2/token`,
            qs.stringify({
                grant_type: "authorization_code",
                client_id: CLIENT_ID,
                code,
                redirect_uri: REDIRECT_URI,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const tokens = tokenResponse.data;

        res.cookie("id_token", tokens.id_token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.redirect("http://localhost:5500/auth-success.html");

    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).send("Token exchange failed");
    }
});

app.get("/api/s3/getFiles", async (req, res) => {
    try {
        const data = await s3.send(
            new ListObjectsV2Command({
                Bucket: "t-level-page-bucket"
            })
        );

        const files = await Promise.all(
            (data.Contents || []).map(async (file) => {
                const command = new GetObjectCommand({
                    Bucket: "t-level-page-bucket",
                    Key: file.Key
                });

                const url = await getSignedUrl(s3, command, {
                    expiresIn: 60 * 5 // 5 minutes
                });

                return {
                    key: file.Key,
                    size: file.Size,
                    modified: file.LastModified,
                    url
                };
            })
        );

        logger.logData(req, res, "Requested all S3 files.")
        return res.json({ files });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to generate signed URLs" });
    }
});

app.get("/api/log", async (req, res) => {
    try {
        logger.logData(req, res, req.query.data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Failed to log" })
    }
});

app.listen(PORT, () => {
    console.log(`Auth server running on http://localhost:${PORT}`);
});