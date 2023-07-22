import {ScoreMapping} from "../interfaces/interfaces";

export class Constants {
    public static ScoreMap: ScoreMapping[] = [
        {score: 1, value: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'S', 'T', 'R']},
        {score: 2, value: ['D', 'G']},
        {score: 3, value: ['B', 'C', 'M', 'P']},
        {score: 4, value: ['F', 'H', 'V', 'W', 'Y']},
        {score: 6, value: ['K']},
        {score: 8, value: ['J', 'X']},
        {score: 10, value: ['Q', 'Z']},
    ];
}