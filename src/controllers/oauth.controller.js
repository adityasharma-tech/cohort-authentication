import { handleSignAccessToken, handleSignRefreshToken } from "../lib/utils.js"

const handleGetAccessToken = async function (req, res) {
  const { scopes } = req.body;
  const { response_type } = req.query;
  if (response_type.trim() != "token")
    return res
      .status(400)
      .json(new Error('We only support "token" type response.'));

    const accessToken = await handleSignAccessToken({
        // TODO
    })

    const refreshToken = await handleSignRefreshToken({
      // TODO
    })

    res.status(200).json({
      accessToken,
      refreshToken  
    })
};

export {
    handleGetAccessToken
}