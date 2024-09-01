import { Prisma, PrismaClient } from "@prisma/client";

async function create(
  todoData: Prisma.TodoCreateInput,
  prisma: PrismaClient = new PrismaClient()
) {
  return prisma.todo.create({ data: todoData });
}

async function update(
  id: string,
  todoData: Prisma.TodoUpdateInput,
  prisma: PrismaClient = new PrismaClient()
) {
  return prisma.todo.update({ where: { id }, data: todoData });
}

async function remove(id: string, prisma: PrismaClient = new PrismaClient()) {
  return prisma.todo.delete({ where: { id } });
}

async function get(id: string, prisma: PrismaClient = new PrismaClient()) {
  return prisma.todo.findUnique({ where: { id } });
}

async function find(prisma: PrismaClient = new PrismaClient()) {
  return prisma.todo.findMany();
}



export default {
    create,
    update,
    remove,
    get,
    find,
}