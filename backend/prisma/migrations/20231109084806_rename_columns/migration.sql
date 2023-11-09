/*
  Warnings:

  - You are about to drop the `New` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "New" DROP CONSTRAINT "New_authorId_fkey";

-- DropTable
DROP TABLE "New";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "new" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "publish_date" TIMESTAMP(3),
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "new_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "new" ADD CONSTRAINT "new_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
