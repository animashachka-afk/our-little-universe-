import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fileId } = req.body;

    if (!fileId) {
      return res.status(400).json({ error: "fileId is required" });
    }

    await client.files.delete(fileId);

    res.status(200).json({
      success: true
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Delete failed"
    });
  }
}
