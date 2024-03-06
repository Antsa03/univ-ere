import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const publication = await prisma.publication.findMany();
    return res.status(200).json(publication);
  } catch (error) {
    return res.status(500).json(error);
  }
}
