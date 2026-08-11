import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { file, fileName } = req.body;

    const result = await client.files.upload({
      file,
      fileName,
      folder: "/our-little-universe"
    });

    res.status(200).json({
      url: result.url,
      fileId: result.fileId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Upload failed"
    });
  }
}
