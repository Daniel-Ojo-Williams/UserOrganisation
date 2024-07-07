import { Router } from "express";
import { authMid, validate } from "../middlewares";
import { OrganisationService } from "../services";
import { OrganisatioController } from "../controllers";

const route = Router();

const orgService = new OrganisationService();
const orgController = new OrganisatioController(orgService);

route.get('/users/:id', authMid, orgController.getUserProfile.bind(orgController));
route.get('/organisations', authMid, orgController.getUserOrganisaions.bind(orgController));

export default route;
