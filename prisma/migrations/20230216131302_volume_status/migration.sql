/*
  Warnings:

  - Changed the type of `status` on the `Volumes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VolumeStatus" AS ENUM ('RECEIVED', 'LABELING', 'SEPARATION', 'DELIVERED', 'TRANSFER', 'DELIVERY', 'COLLECT');

-- AlterTable
ALTER TABLE "Volumes" DROP COLUMN "status",
ADD COLUMN     "status" "VolumeStatus" NOT NULL;
