/*
  Warnings:

  - A unique constraint covering the columns `[name,type]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Tag_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_type_key" ON "Tag"("name", "type");
