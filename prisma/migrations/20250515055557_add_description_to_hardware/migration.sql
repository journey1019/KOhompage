/*
  Warnings:

  - You are about to drop the column `form` on the `Hardware` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hardware" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT NOT NULL,
    "hideTag" TEXT NOT NULL,
    "solutionTag" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "use" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Hardware" ("category", "createdAt", "date", "description", "hideTag", "id", "imageSrc", "path", "slug", "solutionTag", "subtitle", "tags", "title", "updatedAt", "use") SELECT "category", "createdAt", "date", "description", "hideTag", "id", "imageSrc", "path", "slug", "solutionTag", "subtitle", "tags", "title", "updatedAt", "use" FROM "Hardware";
DROP TABLE "Hardware";
ALTER TABLE "new_Hardware" RENAME TO "Hardware";
CREATE UNIQUE INDEX "Hardware_title_key" ON "Hardware"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
