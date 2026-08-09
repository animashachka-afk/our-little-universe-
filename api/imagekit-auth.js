import ImageKit from "@imagekit/nodejs";

export default function handler(req, res) {
    const client = new ImageKit({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY
    });

    const { token, expire, signature } =
        client.helper.getAuthenticationParameters();

    res.status(200).json({
        token,
        expire,
        signature
    });
}
