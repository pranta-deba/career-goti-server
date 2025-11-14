import { COLLECTION_NAME, ROLE } from "../utils/constants.js";
import { getDB } from "./db.config.js";
import bcrypt from "bcrypt";
import {
  ADMIN_EMAIL,
  ADMIN_NAME,
  ADMIN_PASSWORD,
  ADMIN_PHONE,
} from "./env.config.js";

const admin = {
  name: ADMIN_NAME,
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
  role: ROLE.ADMIN,
  image: "",
  createdAt: new Date(),
  isDeleted: false,
  phone: ADMIN_PHONE,
};

const seedAdmin = async () => {
  const db = getDB();
  const isAdminExits = await db
    .collection(COLLECTION_NAME.USER)
    .findOne({ email: ADMIN_EMAIL });

  if (!isAdminExits) {
    
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    admin.password = hashedPassword;
    await db.collection(COLLECTION_NAME.USER).insertOne(admin);
  }
};

export default seedAdmin;
