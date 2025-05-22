-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "contentType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "hideTag" TEXT NOT NULL,
    "solutionTag" TEXT NOT NULL,
    "form" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "use" BOOLEAN NOT NULL DEFAULT true,
    "html" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tagId" INTEGER,
    CONSTRAINT "Resource_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("contentType", "createdAt", "date", "form", "hideTag", "html", "id", "image", "path", "solutionTag", "subtitle", "tags", "title", "updatedAt", "use") SELECT "contentType", "createdAt", "date", "form", "hideTag", "html", "id", "image", "path", "solutionTag", "subtitle", "tags", "title", "updatedAt", "use" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE UNIQUE INDEX "Resource_title_key" ON "Resource"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
