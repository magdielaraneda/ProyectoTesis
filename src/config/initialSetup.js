"use strict";

import Role from "../models/role.model.js";
import User from "../models/user.model.js";


async function createRoles() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    await Promise.all([
      new Role({ name: "admin" }).save(),
      new Role({ name: "gerente" }).save(),
      new Role({ name: "colaborador" }).save(),
      new Role({ name: "cliente" }).save(),
    ]);
    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

async function createUsers() {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;

    const admin = await Role.findOne({ name: "admin" });
    const gerente = await Role.findOne({ name: "gerente" });
    const colaborador = await Role.findOne({ name: "colaborador" });

    await Promise.all([
      new User({
        username: "admin",
        email: "admin@email.com",
        rut: "12345678-0",
        password: await User.encryptPassword("admin123"),
        roles: [admin._id],
      }).save(),
      new User({
        username: "gerente",
        email: "gerente@email.com",
        rut: "87654321-0",
        password: await User.encryptPassword("gerente123"),
        roles: [gerente._id],
      }).save(),
      new User({
        username: "colaborador1",
        email: "colaborador1@email.com",
        rut: "11111111-1",
        password: await User.encryptPassword("colaborador123"),
        roles: [colaborador._id],
        especializacion: "prevencion de riesgos",
      }).save(),
      new User({
        username: "colaborador2",
        email: "colaborador2@email.com",
        rut: "22222222-2",
        password: await User.encryptPassword("colaborador123"),
        roles: [colaborador._id],
        especializacion: "estética",
      }).save(),
      new User({
        username: "colaborador3",
        email: "colaborador3@email.com",
        rut: "33333333-3",
        password: await User.encryptPassword("colaborador123"),
        roles: [colaborador._id],
        especializacion: "limpieza",
      }).save(),
      new User({
        username: "colaborador4",
        email: "colaborador4@email.com",
        rut: "44444444-4",
        password: await User.encryptPassword("colaborador123"),
        roles: [colaborador._id],
        especializacion: "limpieza",
      }).save(),
      new User({
        username: "colaborador5",
        email: "colaborador5@email.com",
        rut: "55555555-5",
        password: await User.encryptPassword("colaborador123"),
        roles: [colaborador._id],
        especializacion: "limpieza",
      }).save(),
      new User({
        username: "colaborador6",
        email: "colaborador6@email.com",
        rut: "66666666-6",
        password: await User.encryptPassword("colaborador123"),
        roles: [colaborador._id],
        especializacion: "limpieza",
      }).save(),
    ]);

    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

export { createRoles, createUsers };
