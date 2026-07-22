import { Router, type IRouter } from "express";
import healthRouter from "./health";
import invitationsRouter from "./invitations";
import collectionsRouter from "./collections";
import contactRequestsRouter from "./contact_requests";
import rsvpRouter from "./rsvp";

const router: IRouter = Router();

router.use(healthRouter);
router.use(invitationsRouter);
router.use(collectionsRouter);
router.use(contactRequestsRouter);
router.use(rsvpRouter);

export default router;
