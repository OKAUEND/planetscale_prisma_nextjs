import { NextApiRequest } from "next";
import prisma from "../../lib/prisma";

type parameter = {
  request: NextApiRequest;
  response: NextApiRequest;
};

type handler = ({ request, response }: parameter) => void;
