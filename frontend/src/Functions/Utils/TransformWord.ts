import {Language} from "../../Schemas/Language";


const TransformWord = (word: string, lang: Language) => {
    const finalWord:string = "";

    const isKeyword = lang.keywords.keyword?.find(keyword => keyword == word);

    if(isKeyword){

        return ;
    }

    return finalWord;
}

export default TransformWord