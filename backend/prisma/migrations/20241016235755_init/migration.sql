/*
  Warnings:

  - Changed the type of `content` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
