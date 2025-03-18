const healthCheck = (_, res)=>{
    res.status(200).json({
        status: 200,
        message: "Server is healthy.",
        data: null,
        success: true
    })
}

const authorize = (req, res) => {

}

const getUserInfo = (req, res) => {

}

export {
    healthCheck,
    authorize,
    getUserInfo
}