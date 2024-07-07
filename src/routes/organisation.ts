import { Router } from "express";
import { authMid, validate } from "../middlewares";
import { OrganisationService } from "../services";
import { OrganisatioController } from "../controllers";
import { addUser, createOrganisation } from "../validators";

const route = Router();

const orgService = new OrganisationService();
const orgController = new OrganisatioController(orgService);

route.get('/users/:id', authMid, orgController.getUserProfile.bind(orgController));
route.get('/organisations', authMid, orgController.getUserOrganisaions.bind(orgController));
route.get('/organisations/:orgId', authMid, orgController.getOrganisation.bind(orgController));
route.post('/organisations', authMid, validate(createOrganisation), orgController.createOrganisation.bind(orgController));
route.post('/organisations/:orgId/users', authMid, validate(addUser), orgController.addUserToOrg.bind(orgController));

export default route;
