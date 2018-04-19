import { Component, OnInit } from '@angular/core';
import { QuizService, CreateQuizService } from '../../_services/';
import { Observable } from 'rxjs/Observable';
import { isType } from '@angular/core/src/type';
import 'rxjs/Rx'; 
import { Promise } from 'q';
import { decode } from '@angular/router/src/url_tree';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  public id;
  public source;
  public allQuestions:any = {};
  public currentIndex:number = 0;
  public question:any = {};
  public title:string = "";
  public correctAnswer:string = "";
  public allAnswers:any[];

  public totalCorrect:number = 0;
  

  constructor(
    private quizApi: QuizService,
    private userQuizesApi: CreateQuizService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => this.id = (params['id']));
    this.route.params.subscribe((params) => this.source = String(params['source']));
    this.getQuestions(this.source, this.id);
  }

  getQuestions(source, id) {
    console.log(source, id)
    if (source == 'users') {
      this.userQuizesApi.getQuiz(id)
      .subscribe((response) => {
        console.log(response);
      })
      //llama a nuestra api
    } else if (source == 'categories') {
      this.quizApi.getQuestions(id)
      .subscribe((response) => {
      this.allQuestions = response;
      this.decodeJSON()
      this.prepareQuestion();
    });
    }
  }  
  

  decodeJSON() {
    this.allQuestions.forEach(element => {
      element.category = atob(element.category);
      element.type = atob(element.type);
      element.difficulty = atob(element.difficulty);
      element.question = atob(element.question);
      element.correct_answer = atob(element.correct_answer);
      element.incorrect_answers = element.incorrect_answers.map(answer => {
        return answer = atob(answer)
      });
    });
  }

  prepareQuestion() {
    console.log('endquiz', this.endQuiz())
    if (!this.endQuiz()) {
      this.question = (this.allQuestions[this.currentIndex]);
      this.title = this.question.question;
      this.correctAnswer = this.question.correct_answer;
      this.allAnswers = this.question.incorrect_answers;
      this.allAnswers.push(this.correctAnswer);
      this.allAnswers.sort();
    } else {
      console.log('game has ended');
    }
  }

  getResponse(response) {
    if(response == this.correctAnswer ){
      console.log(response,'answer is correct');
      this.totalCorrect++;
    } else {
      console.log(response, 'answer is incorrect');
    }
    this.currentIndex++;
    this.prepareQuestion();
    console.log('total correct',this.totalCorrect)
    console.log('quiz length', this.allQuestions.length)

    console.log('this turn', this.currentIndex)
  }

  endQuiz() {
    if(this.currentIndex > this.allQuestions.length-1){
      return true;
    } else {
      return false;
    }
  }
}
