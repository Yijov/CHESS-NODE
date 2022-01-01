import { Router, Request, Response, NextFunction } from "express";

const RestRouter: Router = Router();

RestRouter.use("/v1", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: "completed", payload: {} });
});

export default RestRouter;
