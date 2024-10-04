import { NgForOf, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: "app.component.html",
  styles: [],
})
export class AppComponent {
  public title: string = "Jogo de Adivinhação";
  public difficult: string = "";
  public hiddenNumber: number = 0;
  public chooseNumber: number = 0;
  public lives: number = 0;
  public score: number = 0;
  public amountPossibility: number = 0;
  public gameIsOver: boolean = false;
  public triedNumbers: number[] = [];
  public result: any;

  public progressBarColor: string = "";
  public progressBarWidht: number = 0;
  public percentOfProgressBar: number = 0;
  public helperBar: number = 0;
  public hidder: string = "d-none";
  public message: string = "";
  public alert: string = "";
  public alertDifficult: string = "secondary";

  constructor() {
    this.replay();
  }

  public selectDifficult(difficult: string): void {
    this.difficult = difficult;

    switch (difficult) {
      case "Fácil":
        this.setupGame(10, "primary", 3);
        break;
      case "Médio":
        this.setupGame(50, "warning", 5);
        break;
      case "Difícil":
        this.setupGame(100, "danger", 7);
        break;
    }
  }

  private setupGame(
    amountPossibility: number,
    alertDifficult: string,
    lives: number
  ): void {
    this.alertDifficult = alertDifficult;
    this.amountPossibility = amountPossibility;
    this.hiddenNumber = Math.floor(Math.random() * this.amountPossibility) + 1;
    this.lives = lives;
  }

  public replay(): void {
    this.triedNumbers = [];
    this.score = 100;
    this.gameIsOver = false;

    this.progressBarWidht = 100;
    this.chooseNumber = 1;
    this.percentOfProgressBar = 0;
    this.helperBar = this.progressBarWidht;

    this.progressBarColor = "";
    this.hidder = "d-none";
    this.message = "";
    this.alert = "";

    this.selectDifficult(this.difficult);
  }

  public calculateScore(chooseNumber: number): number {
    const difference = Math.abs(this.hiddenNumber - chooseNumber);

    if (difference >= 10) this.score -= 10;
    else if (difference >= 5) this.score -= 4;
    else this.score -= 2;

    return this.score;
  }

  public guessNumber(): void {
    if (this.chooseNumber > this.amountPossibility) {
      this.chooseNumber = this.amountPossibility;
    }

    this.percentOfProgressBar = Math.abs(
      (this.chooseNumber - this.hiddenNumber) *
        (this.progressBarWidht / this.amountPossibility)
    );

    this.triedNumbers.push(this.chooseNumber);
    this.triedNumbers.sort((a, b) => a - b);

    if (this.lives >= 1) {
      this.processGuess();
    } else {
      this.endGame("Você perdeu! :(", "bg-danger", "danger");
    }
  }

  private processGuess(): void {
    if (this.chooseNumber == this.hiddenNumber) {
      this.endGame("Você Venceu!", "bg-success", "success");
    } else if (this.chooseNumber < this.hiddenNumber) {
      this.handleIncorrectGuess("Tente um número mais alto!");
      this.calculateScore(this.chooseNumber);
    } else {
      this.handleIncorrectGuess("Tente um número mais baixo!");
      this.calculateScore(this.chooseNumber);
    }
  }

  private handleIncorrectGuess(message: string): void {
    this.lives -= 1;
    this.message = message;
    this.progressBarColor = "bg-warning";
    this.hidder = "";
    this.alert = "warning";
    this.helperBar = this.percentOfProgressBar;
  }

  private endGame(
    message: string,
    progressBarColor: string,
    alert: string
  ): void {
    this.message = message;
    this.progressBarColor = progressBarColor;
    this.hidder = "";
    this.alert = alert;
    this.helperBar = this.progressBarWidht;
    this.gameIsOver = true;
  }
}
