const express = require('express');
const authRouter = express.Router();
const { register, login, logout,adminRegister,deleteProfile } = require('../controllers/userAuthent');
const userMiddleWare = require('../middleware/userMiddleWare');
const adminMiddleware = require('../middleware/adminMiddleware');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout',userMiddleWare,logout);
authRouter.post('/admin/register',adminMiddleware,adminRegister);
authRouter.delete('/deleteProfile',userMiddleWare,deleteProfile);
authRouter.get('/check',userMiddleWare,(req,res)=>{
    const reply = {
        firstName: req.result.firstName,
        emailID: req.result.emailID,
        _id: req.result._id,
        role :req.result.role,
    } 
    res.status(200).json({
        user:reply,
        Message:"Valid User"
    });
})
module.exports = authRouter;
