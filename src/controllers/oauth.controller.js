import { PrismaClient } from "@prisma/client";
import {
  handleSignAccessToken,
  handleSignRefreshToken,
  isRefreshTokenValid,
} from "../lib/utils.js";

const handleGetAccessToken = async function (req, res) {
  const client = req.client;
  const { response_type, sub, scope } = req.query;
  const prisma = new PrismaClient();
  if (![sub, scope].some((value) => (value ? value.trim() != "" : false)))
    return res.status(400).json({
      message: "validation error: please provide the sub id and scope",
    });

  if (!response_type || response_type.trim() != "token")
    return res
      .status(400)
      .json({ message: 'We only support "token" type response.' });

  const accessToken = await handleSignAccessToken({
    sub,
    aud: [client.clientId],
    scopes: scope.trim().toLowerCase().split(","),
  });

  const refreshToken = await handleSignRefreshToken({
    sub,
    aud: [client.clientId],
  });

  const user = await prisma.user.findFirst({
    where: {
      clientId: client.clientId,
      sub: sub.trim(),
    },
  });

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        clientId: client.clientId,
        sub: sub.trim(),
        refreshToken,
      },
    });
    if (!newUser)
      return res.status(400).json({
        message: "Failed to update the refresh token of the user.",
      });
  } else {
    const updatedUsers = await prisma.user.updateMany({
      where: {
        clientId: client.clientId,
        sub: sub.trim(),
      },
      data: {
        refreshToken,
      },
    });
    if (updatedUsers.count <= 0)
      return res.status(400).json({
        message: "Failed to update the refresh token of the user.",
      });
  }

  res.status(200).json({
    accessToken,
    refreshToken,
  });
};

const handleRefreshAccessToken = async function (req, res) {
  const client = req.client;
  const { refreshToken } = req.body;

  if (!refreshToken || refreshToken.trim() == "")
    return res.status(400).json({
      message: "please provide the refreshToken.",
    });

  const prisma = new PrismaClient();

  try {
    const user = await prisma.client.findFirst({
      where: {
        refreshToken: refreshToken.trim(),
      },
    });
    if (!user)
      return res.status(400).json({
        message: "Unauthorized: User not found.",
      });
    const sub = await isRefreshTokenValid(user.refreshToken);
    if (!sub)
      return res.status(400).json({
        message: `You expired token successfully. 😂`,
      });

    const newRefreshToken = await handleSignRefreshToken({
      sub: sub,
      aud: [client.clientId],
    });

    const newAccessToken = await handleRefreshAccessToken({
      sub: sub,
      aud: [client.clientId],
    });

    res.status(200).json({
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(400).json({
      message: `Some error occured: ${error.message}`,
    });
  }
};

const handleRevokeTokenScope = async function (req, res) {
  const client = user.client;
};

export { handleGetAccessToken, handleRefreshAccessToken };
