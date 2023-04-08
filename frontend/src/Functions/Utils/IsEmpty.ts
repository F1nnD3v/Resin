
const IsEmpty = (text:string) => {
    text = text.trim().toString();
    return text.length <= 0;
}

export default IsEmpty