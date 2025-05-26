/*
  Warnings:

  - Added the required column `scope` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "scope" TEXT NOT NULL
);
INSERT INTO "new_Tag" ("id", "name", "type") SELECT "id", "name", "type" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_name_type_scope_key" ON "Tag"("name", "type", "scope");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
