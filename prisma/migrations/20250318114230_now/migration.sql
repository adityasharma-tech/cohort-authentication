-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "phone_number" TEXT,
    "picture" TEXT DEFAULT 'https://avatar.iran.liara.run/public/boy',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
