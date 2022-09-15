import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type parameter = {
  request: NextApiRequest;
  response: NextApiResponse;
};

type Handler = ({ request, response }: parameter) => void;

const handler: Handler = async ({ request, response }) => {
  const { method } = request;
  switch (method) {
    case "GET":
      try {
        const star = await prisma.star.findMany({});
        response.status(200).json(star);
      } catch (e) {}
      break;
    default:
  }
};
