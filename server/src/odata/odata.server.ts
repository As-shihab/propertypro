// src/odata/odata-server.ts
import { ODataServer, odata } from 'odata-v4-server';
import { createODataController } from '@odata/generic-odata.controller';
import { GenericODataService } from '@odata/services/generic-odata.service';
import { PrismaService } from '@prisma/prisma.service';
import { User } from '@models/auth/User';
import { Product } from '@models/product/Product';
import { Category } from '@models/product/Category';
import { Media } from '@models/media/Media';


const prismaService = new PrismaService();
const service = new GenericODataService(prismaService);

// =========== Create OData Controllers ============

const UserController = createODataController(User, 'user', service);




// =========== OData Product section ============

const ProductController = createODataController(Product, 'product', service);
console.log('from odata sever')
const CategoryController = createODataController(Category, 'category', service);



// ========== OData Media section ============
const MediaController = createODataController(Media, 'media', service);




// =========== Register OData Services ============
// ============ Register OData Controllers ============
// ====================================================
// This is where we register our OData controllers with the OData server
@odata.controller(UserController, true)

// ========== Register Product Controllers ============
@odata.controller(ProductController, true)
@odata.controller(CategoryController, true)
@odata.controller(MediaController, true)


export class MyODataServer extends ODataServer {}
