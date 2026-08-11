export default async function handler(req, res) {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;

    if (!privateKey || !publicKey) {
      return res.status(500).json({
        error: "ImageKit keys are missing"
      });
    }

    const token = crypto.randomUUID();
    const expire = Math.floor(Date.now() / 1000) + 1800;

    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(privateKey),
      {
        name: "HMAC",
        hash: "SHA-1"
      },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(token + expire)
    );

    const signature = Array.from(
      new Uint8Array(signatureBuffer)
    )
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    res.status(200).json({
      token,
      expire,
      signature,
      publicKey
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate authentication"
    });
  }
}
