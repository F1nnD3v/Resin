export interface SyntaxHighlightingScheme {
    name: string;
    fileExtensions: string[];
    keywords: { [type: string]: string[] };
    colors: { [type: string]: string };
}
