-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "bestTeamId" TEXT,
    "bestPlayerId" TEXT,
    CONSTRAINT "Sport_bestTeamId_fkey" FOREIGN KEY ("bestTeamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Sport_bestPlayerId_fkey" FOREIGN KEY ("bestPlayerId") REFERENCES "Player" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Sport" ("createdAt", "description", "history", "id", "imageUrl", "name", "updatedAt") SELECT "createdAt", "description", "history", "id", "imageUrl", "name", "updatedAt" FROM "Sport";
DROP TABLE "Sport";
ALTER TABLE "new_Sport" RENAME TO "Sport";
CREATE UNIQUE INDEX "Sport_name_key" ON "Sport"("name");
CREATE UNIQUE INDEX "Sport_bestTeamId_key" ON "Sport"("bestTeamId");
CREATE UNIQUE INDEX "Sport_bestPlayerId_key" ON "Sport"("bestPlayerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
