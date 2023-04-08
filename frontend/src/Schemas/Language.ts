export interface Language {
    name: string;
    fileExtensions: string[];
    keywords: {
        keyword?: string[];
        literal?: string[];
        attribute?: string[];
    };
    colors: {
        keyword: string;
        literal?: string;
        attribute?: string;
        comment?: string;
        string?: string;
        number?: string;
        operator?: string;
    };
}
