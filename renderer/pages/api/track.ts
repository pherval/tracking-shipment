import { NextApiHandler } from "next";
import { trackShipment } from "../../adapters/correios";

const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query;

  if (!code || Array.isArray(code)) {
    return res.status(400).json({
      error:
        "missing code or invalid code. Please provide a single string at code query string",
    });
  }

  try {
    const tracking = await trackShipment(code);

    res.status(200).json(tracking);
  } catch (err: any) {
    if (err?.name === "CorreiosError") {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
      console.error(err);
    }
  }
};

export default handler;
