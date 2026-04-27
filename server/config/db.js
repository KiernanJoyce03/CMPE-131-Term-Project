import { PrismaClient } from "../../src/generated/prisma/index.js"

const prisma = new PrismaClient({
    log:
        process.env.NODE_ENV === "development" ?
            ["query", "info", "warn", "error"] :
            ["error"],
});

const connectDB = async () => {
    try{
        await prisma.$connect();
        console.log("Connected to the database successfully.");

    }catch(error){
        console.error("Error connecting to the database:", error);
    }
};

const disconnectDB = async () => {
    await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };
