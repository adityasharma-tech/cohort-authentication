import { handleSignAccessToken, handleSignRefreshToken } from "../lib/utils.js";

const handleGetAccessToken = async function (req, res) {
  const user = req.user;
  const { response_type, sub, scope } = req.query;
  if (![sub, scope].some((value) => (value ? value.trim() == "" : false)))
    return res
      .status(400)
      .json(new Error("validation error: please provide the sub id."));

  if (response_type.trim() != "token")
    return res
      .status(400)
      .json(new Error('We only support "token" type response.'));

  const accessToken = await handleSignAccessToken({
    sub,
    aud: [user.id],
    scopes: scope.trim().toLowerCase().split(",")
  });

  const refreshToken = await handleSignRefreshToken({
    sub,
    aud: [user.id],
  });

  res.status(200).json({
    accessToken,
    refreshToken,
  });
};

export { handleGetAccessToken };
