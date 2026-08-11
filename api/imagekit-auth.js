const crypto = require("crypto");

module.exports = function handler(req, res) {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!privateKey) {
        return res.status(500).json({
            error: "IMAGEKIT_PRIVATE_KEY is not configured"
        });
    }

    const token = crypto.randomUUID();

    const expire = Math.floor(Date.now() / 1000) + 1800;

    const signature = crypto
        .createHmac("sha1", privateKey)
        .update(token + expire)
        .digest("hex");

    res.status(200).json({
        token,
        expire,
        signature,
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY
    });
};
        
    

