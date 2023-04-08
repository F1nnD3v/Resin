/*
  Warnings:

  - Added the required column `idLang` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "idLang" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "languageName" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageExtension" (
    "id" SERIAL NOT NULL,
    "Extension" TEXT NOT NULL,
    "idLanguage" INTEGER NOT NULL,

    CONSTRAINT "LanguageExtension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageTheme" (
    "id" SERIAL NOT NULL,
    "idLanguage" INTEGER NOT NULL,
    "idTheme" INTEGER NOT NULL,

    CONSTRAINT "LanguageTheme_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_idLang_fkey" FOREIGN KEY ("idLang") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageExtension" ADD CONSTRAINT "LanguageExtension_idLanguage_fkey" FOREIGN KEY ("idLanguage") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageTheme" ADD CONSTRAINT "LanguageTheme_idLanguage_fkey" FOREIGN KEY ("idLanguage") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageTheme" ADD CONSTRAINT "LanguageTheme_idTheme_fkey" FOREIGN KEY ("idTheme") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
