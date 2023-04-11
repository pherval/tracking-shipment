import { NextApiHandler } from "next";
import { trackShipment } from "../../adapters/correios";

const handler: NextApiHandler = async (req, res) => {
  const { codes } = req.body;

  console.log("codes");
  const trackings = await trackShipment(["TF485920436BR"]);

  res.status(200).send(trackings);
};

export default handler;
