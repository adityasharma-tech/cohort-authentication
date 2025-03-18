/*
  Warnings:

  - You are about to drop the column `client_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `client_secret` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientSecret` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "client_id",
DROP COLUMN "client_secret",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "clientSecret" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
