import asyncHandler from "express-async-handler";

const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(403)
        throw new Error('Access Denied')
    }
});

export { isAdmin }