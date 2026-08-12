export default async function handler(req, res) {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!privateKey) {
      return res.status(500).json({
        error: "IMAGEKIT_PRIVATE_KEY не найден"
      });
    }

    const auth = Buffer.from(`${privateKey}:`).toString("base64");

    const response = await fetch(
      "https://api.imagekit.io/v1/files?path=/our-little-universe",
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const photos = data
      .filter(file => file.type === "file")
      .map(file => ({
        url: file.url,
        fileId: file.fileId,
        name: file.name
      }));

    return res.status(200).json(photos);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Не удалось получить фотографии"
    });
  }
}
