export interface Bible {
    id: number;
    book: number;
    chapter: number;
    verse: number;
    scripture: string;
    testament: string;
    bookShort: string;
    bookNepali: string;
    bookEnglish: string;
    version: number;
    isTitle: number;
}

export interface BibleInfo {
    bookId: number;
    testament: string;
    bookNepali: string;
    bookEnglish: string;
    bookShort: string;
    chapter: number;
}
