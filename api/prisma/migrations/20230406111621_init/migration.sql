-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "themeId" INTEGER NOT NULL DEFAULT 1,
    "autosave" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "themeName" TEXT NOT NULL DEFAULT 'Default theme',
    "creatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThemeColors" (
    "id" SERIAL NOT NULL,
    "Background" TEXT NOT NULL DEFAULT 'FFFFFF',
    "CurrentLine" TEXT NOT NULL DEFAULT '000000',
    "Foreground" TEXT NOT NULL DEFAULT '333333',
    "Comment" TEXT NOT NULL DEFAULT '888888',
    "keyword" TEXT NOT NULL DEFAULT 'FF6600',
    "comment" TEXT NOT NULL DEFAULT '008000',
    "string" TEXT NOT NULL DEFAULT '800080',
    "number" TEXT NOT NULL DEFAULT '0000FF',
    "operator" TEXT NOT NULL DEFAULT 'FF0000',

    CONSTRAINT "ThemeColors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "belongsTo" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "idOwner" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_belongsTo_fkey" FOREIGN KEY ("belongsTo") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_idOwner_fkey" FOREIGN KEY ("idOwner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
