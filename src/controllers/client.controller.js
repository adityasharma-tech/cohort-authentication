import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const onboard = async function (req, res) {
  const { email, password } = req.body;

  if ((!email, !password))
    return res
      .status(400)
      .json(new Error("email & password are required fields."));

      const prisma = new PrismaClient()
      prisma.user.create({
        data: {
            email,
            
        }
      })
};
