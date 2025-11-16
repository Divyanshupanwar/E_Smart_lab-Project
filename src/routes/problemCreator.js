const express = require('express');
const problemRouter = express.Router();
const userMiddleWare = require('../middleware/userMiddleWare');
const adminMiddleware = require('../middleware/adminMiddleware');
const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblemByUser,submittedProblem} = require('../controllers/userProblem');




problemRouter.post("/create",adminMiddleware,createProblem);
problemRouter.put("/update/:id", adminMiddleware, updateProblem);
problemRouter.delete("/delete/:id", adminMiddleware, deleteProblem);

problemRouter.get("/problemById/:id", userMiddleWare, getProblemById);
problemRouter.get("/getAllProblem",userMiddleWare,getAllProblem);
problemRouter.get("/problemSolvedbyUser",userMiddleWare,solvedAllProblemByUser);
problemRouter.get("/submittedProblem/:pid",userMiddleWare,submittedProblem);

module.exports = problemRouter;
