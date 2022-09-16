import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../src/lib/prisma";

type parameter = {
  request: NextApiRequest;
  response: NextApiResponse;
};

type Handler = (request: NextApiRequest, response: NextApiResponse) => void;

const handler: Handler = async (request, response) => {
  const { method } = request;
  switch (method) {
    case "GET":
      try {
        const star = await prisma.star.findMany({});
        response.status(200).json(star);
      } catch (e) {
        console.error("Request error", e);
        response.status(500).json({ error: "Error fetchng posts" });
      }
      break;
    default:
      response.setHeader("Allow", ["GET"]);
      response.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default handler;
