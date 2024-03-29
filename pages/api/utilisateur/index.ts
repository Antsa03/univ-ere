import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const utilisateur = await prisma.utilisateur.findMany();
    res.status(200).json(utilisateur);
  } catch (error) {
    return res.status(500).json(error);
  }
}
