import * as fs from "fs";
import {Language} from "../../Schemas/Language";
import TransformWord from "./TransformWord";

const TransformCode = (code: string, line: number, langExtension: string) => {
    let codeSplited = code.split(" ");
    let finalCode: string;

    fs.readdir('../ReservedWords/reservedWords.json', (e: NodeJS.ErrnoException | null, files: string[]) => {
        if (e) {
            console.error(e);
            return;
        }

        const fileName = '../ReservedWords/reservedWords.json';
        const fileContent = fs.readFileSync(fileName, 'utf8');
        if (!fileContent) {
            return console.error(`${fileName} not found.`)
        }

        const languages: Language[] = JSON.parse(fileContent);
        const language = languages.find((language) => language.fileExtensions.includes(langExtension));

        if (!language) {
            return console.error(`${langExtension} not found.`)
        }

        finalCode = `<div key={line} id="codeLine">`;

        codeSplited.forEach(word => {
            finalCode += TransformWord(word, language);
        })

        finalCode += "</div>"

        return finalCode;
    });
}

export default TransformCode