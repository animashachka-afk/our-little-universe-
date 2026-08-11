const crypto = require("crypto");

module.exports = function handler(req, res) {

    if (req.method !== "GET") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!privateKey) {
        return res.status(500).json({
            error: "IMAGEKIT_PRIVATE_KEY is not configured"
        });
    }

    const token = crypto.randomUUID();

    const expire =
        Math.floor(Date.now() / 1000) + 2400;

    const signature =
        crypto
            .createHmac("sha1", privateKey)
            .update(token + expire)
            .digest("hex");

    return res.status(200).json({
        token,
        expire,
        signature
    });
};
