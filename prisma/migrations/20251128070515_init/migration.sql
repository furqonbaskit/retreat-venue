/*
  Warnings:

  - You are about to drop the column `capatity` on the `Venue` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "capatity",
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "photos" TEXT[];
