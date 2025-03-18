import { handleSignAccessToken, handleSignRefreshToken } from "../lib/utils.js"

const handleGetAccessToken = async function (req, res) {
  const { scopes } = req.body;
  const { response_type , sub } = req.query;
  if(!sub || sub.trim()==""){
    return res
        .status(400)
        .json(new Error('please provide the sub id.'))
  }
  if (response_type.trim() != "token")
    return res
      .status(400)
      .json(new Error('We only support "token" type response.'));

    const accessToken = await handleSignAccessToken({
        sub
    })

    const refreshToken = await handleSignRefreshToken({
      sub
    })

    res.status(200).json({
      accessToken,
      refreshToken  
    })
};

export {
    handleGetAccessToken
}