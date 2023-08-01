export interface ScoreMapping {
    score: number;
    value: string[];
}

export interface Score {
    word: string,
    score: number,
    created_at: Date;
    already_exists: boolean;
}

export interface ScorePage<T> {
    data: T[];
    current_page: number;
    total: number;
    last_page: number;
    from: number;
}

export interface Toast {
    message: string;
    show: boolean;
}

export interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
    total: number;
}