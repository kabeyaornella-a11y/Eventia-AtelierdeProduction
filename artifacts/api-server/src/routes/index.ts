import { Router, type IRouter } from "express";
import healthRouter from "./health";
import invitationsRouter from "./invitations";
import collectionsRouter from "./collections";

const router: IRouter = Router();

router.use(healthRouter);
router.use(invitationsRouter);
router.use(collectionsRouter);

export default router;
