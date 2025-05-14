-- CreateTable
CREATE TABLE "Resource" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
