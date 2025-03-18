import bcrypt from "bcryptjs";
import crpyto from "crypto";
import { PrismaClient } from "@prisma/client";

const onboardHandling = async function (req, res) {
  const { email, password } = req.body;

  if ((!email, !password))
    return res
      .status(400)
      .json(new Error("email & password are required fields."));

  try {
    const clientId = crypto.randomBytes(10).toString("hex");
    const clientSecret = crpyto.randomBytes(20).toString("hex");

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (user)
      return res
        .status(400)
        .json(new Error("user already exists with same email id."));

    const newUser = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        passwordHash: hashedPassword,
        clientId,
        clientSecret,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(`Error occured in onboarding: ${error.message}`);
    return res.status(400).json(new Error(error));
  }
};

const getUserDetails = async function (req, res) {
  const { email, password } = req.body;

  if ((!email, !password))
    return res
      .status(400)
      .json(new Error("email & password are required fields."));
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
      where: {
        email: email.trim().toLowerCase(),
      },
    });
    if (!user) return res.status(400).json(new Error("can not find user."));

    res.status(200).json(user);

  } catch (error) {
    console.error(`Error occured in onboarding: ${error.message}`);
    return res.status(400).json(new Error(error));
  }
};


export {
    onboardHandling,
    getUserDetails
}