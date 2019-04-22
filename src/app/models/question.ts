import { AnswerModel } from './Answer';
import { CategoryQuestionModel } from './CategoryQuestion';

export interface QuestionModel {
    questionId: number;
    questionText: string;
    answers: Array<AnswerModel>;
    correctAnswerId: number;
    category: CategoryQuestionModel;
    categoryId:number;
}
