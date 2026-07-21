import { Router, type IRouter } from "express";
import healthRouter from "./health";
import invitationsRouter from "./invitations";
import collectionsRouter from "./collections";
import contactRequestsRouter from "./contact_requests";

const router: IRouter = Router();

router.use(healthRouter);
router.use(invitationsRouter);
router.use(collectionsRouter);
router.use(contactRequestsRouter);

export default router;
