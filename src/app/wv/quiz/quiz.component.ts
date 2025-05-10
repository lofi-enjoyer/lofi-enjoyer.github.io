import {Component} from '@angular/core';
import {Question} from '../../../types/question';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {QuestionResult} from '../../../types/question-result.type';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    NgStyle
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  questions : Question[] = [];
  currentQuestion: Question = { text: "", answers: [], correctAnswers: [] };
  currentQuestionIndex: number = -1;
  questionResults: QuestionResult[] = [];
  answerSelected: number = -1;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    http.get<Question[]>("/quiz/questions.json").subscribe({
      next: data => {
        setTimeout(() => {
          this.shuffleQuestions(data);
          this.questions = data;
          this.currentQuestionIndex = 0;
          this.currentQuestion = this.questions[0];
          this.questionResults = new Array(this.questions.length);
        }, 300);
      },
      error: err => {

      }
    });
  }

  answerCurrentQuestion(answerIndex: number): void {
    if (this.answerSelected != -1)
      return;

    this.answerSelected = answerIndex;
    this.questionResults[this.currentQuestionIndex] = {
      correct: this.currentQuestion.correctAnswers.includes(answerIndex),
      answerIndex: answerIndex
    };
  }

  goToNextQuestion() {
    if (this.answerSelected == -1)
      return;

    this.answerSelected = -1;
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestionIndex += 1;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  getResults(): number {
    return (this.questionResults.filter(value => {
      return value.correct;
    }).length / this.questions.length) * 100;
  }

  getResultsReview(): string {
    const results = this.getResults();
    if (results >= 90) {
      return "¡Bien hecho! ¡Eres un/a verdadero/a WorldVisioner!"
    } else if (results >= 70) {
      return "Buen resultado, ¡aunque puedes mejorar todavía más!"
    } else if (results >= 50) {
      return "No está mal, pero seguro que puedes hacerlo mejor."
    } else if (results >= 20) {
      return "Todavía te queda un largo camino por recorrer."
    } else {
      return "¿Seguro que has visto WorldVision?"
    }
  }

  isThereNextQuestion() {
    return this.currentQuestionIndex < this.questions.length - 1;
  }

  shouldShowAsCorrect(answerIndex: number): boolean {
    return this.answerSelected != -1 && this.currentQuestion.correctAnswers.includes(answerIndex);
  }

  shouldShowAsIncorrect(answerIndex: number): boolean {
    return this.answerSelected == answerIndex && !this.currentQuestion.correctAnswers.includes(answerIndex);
  }

  getButtonClass(answerIndex: number): string {
    if (this.answerSelected == -1)
      return "";

    if (this.shouldShowAsCorrect(answerIndex)) {
      return "correct-answer";
    } else if (this.shouldShowAsIncorrect(answerIndex)) {
      return "incorrect-answer";
    } else {
      return "other-answer";
    }
  }

  restartQuiz(): void {
    const url = this.router.url;
    this.router.navigateByUrl("/wv", { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]);
    });
  }

  shuffleQuestions(array: Array<Question>) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    array.forEach(value => {
      this.shuffleAnswers(value);
    })
  }

  shuffleAnswers(question: Question) {
    const array = question.answers;
    let currentIndex = array.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      if (question.correctAnswers.includes(currentIndex)) {
        const answerIndex = question.correctAnswers.indexOf(currentIndex);
        question.correctAnswers[answerIndex] = randomIndex;
      } else if (question.correctAnswers.includes(randomIndex)) {
        const answerIndex = question.correctAnswers.indexOf(randomIndex);
        question.correctAnswers[answerIndex] = currentIndex;
      }
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

}
