import crpyto from "crypto";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @returns {void}
 */
const onboardHandling = async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({message: "email & password are required fields."});

  try {
    const clientId = crpyto.randomBytes(20).toString("hex");
    const clientSecret = crpyto.randomBytes(20).toString("hex");

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const prisma = new PrismaClient();

    const user = await prisma.client.findFirst({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    console.log("user", user)

    if (user)
      return res
        .status(400)
        .json({message: "user already exists with same email id."});

    const newUser = await prisma.client.create({
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
    return res.status(400).json({ message: "user already exists with same email id." });
  }
};


/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @returns {void}
 */
const getUserDetails = async function (req, res) {
  const { email, password } = req.body;

  if ((!email, !password))
    return res
      .status(400)
      .json({message: "email & password are required fields."});
  try {
    const prisma = new PrismaClient();
    const user = await prisma.client.findFirst({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.passwordHash)

    if(!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    res.status(200).json(user);

  } catch (error) {
    console.error(`Error occured in onboarding: ${error.message}`);
    return res.status(400).json({message: "user already exists with same email id."});
  }
};


export {
    onboardHandling,
    getUserDetails
}