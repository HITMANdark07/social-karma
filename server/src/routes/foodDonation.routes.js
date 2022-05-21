import * as foodDonationController from '../controllers/foodDonation.controller.js';
import * as foodDonationValidator from '../validator/foodDonation.validator.js';
import * as userController from '../controllers/user.controllers.js';
import { Router } from 'express';

const router = Router();

router.post("/create",foodDonationValidator.createFoodDonationValidator, foodDonationController.createFoodDonation);
router.put("/update-status",foodDonationController.updateStatus);
router.put("/assign-volunteer",foodDonationController.assignVolenteer);
router.get("/list/volunteer/:volunteerId",foodDonationController.listAssignedTasks);
router.get("/list/donator/:donatorId",foodDonationController.listAssignedTasks);

router.param("volunteerId", userController.userById);
router.param("donatorId", userController.userById);

export default router;