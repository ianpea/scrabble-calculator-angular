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

export interface LaravelPage<T> {
    data: T[];
}

export interface Toast {
    message: string;
    show: boolean;
}