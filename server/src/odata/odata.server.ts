// src/odata/odata-server.ts
import { ODataServer, odata } from 'odata-v4-server';
import { createODataController } from '@odata/generic-odata.controller';
import { GenericODataService } from '@odata/services/generic-odata.service';
import { PrismaService } from '@prisma/prisma.service';
import { User } from '@models/auth/User';


const prismaService = new PrismaService();
const service = new GenericODataService(prismaService);

// =========== Create OData Controllers ============

const UserController = createODataController(User, 'user', service);

// ============ Register OData Controllers ============
@odata.controller(UserController, true)
export class MyODataServer extends ODataServer {}
