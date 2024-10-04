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
  public progressBarColor: string = "";
  public hidder: string = "d-none";
  public message: string = "";
  public alert: string = "";
  public difficult: string = "";
  public alertDifficult: string = "secondary";

  public percentOfProgressBar: number = 0;
  public amountPossibility: number = 50;
  public progressBarWidht: number = 100;
  public chooseNumber: number = 1;
  public hiddenNumber: number = 0;
  public helperBar: number = 0;
  public score: number = 1000;
  public lives: number = 0;

  public triedNumbers: number[] = [];

  public gameIsOver: boolean = false;
  result: any;

  constructor() {
    this.replay();
  }

  public selectDifficult(difficult: string): void {
    this.difficult = difficult;

    if (difficult == "Fácil") this.alertDifficult = "primary";
    else if (difficult == "Médio") this.alertDifficult = "warning";
    else this.alertDifficult = "danger";
  }

  public replay(): void {
    this.triedNumbers = [];
    this.amountPossibility = 50;
    this.score = 1000;

    this.hiddenNumber = Math.floor(Math.random() * this.amountPossibility) + 1;

    this.progressBarWidht = 100;
    this.chooseNumber = 1;
    this.percentOfProgressBar = 0;
    this.helperBar = this.progressBarWidht;
    this.gameIsOver = false;

    this.progressBarColor = "";
    this.hidder = "d-none";
    this.message = "";
    this.alert = "";
  }

  public calculateScore(chooseNumber: number): number {
    this.result = this.hiddenNumber - chooseNumber;

    return this.result;
  }

  public guessNumber(): void {
    if (this.chooseNumber > this.amountPossibility)
      this.chooseNumber = this.amountPossibility;

    this.percentOfProgressBar = Math.abs(
      (this.chooseNumber - this.hiddenNumber) *
        (this.progressBarWidht / this.amountPossibility)
    );

    this.triedNumbers.push(this.chooseNumber);

    this.triedNumbers.sort((a, b) => a - b);

    if (this.chooseNumber == this.hiddenNumber) {
      this.message = "Voce Venceu!";
      this.progressBarColor = "bg-success";
      this.hidder = "";
      this.alert = "success";

      this.helperBar = this.progressBarWidht;
      this.gameIsOver = true;
    } else if (this.chooseNumber < this.hiddenNumber) {
      this.message = "Tente um numero mais alto!";
      this.progressBarColor = "bg-warning";
      this.hidder = "";
      this.alert = "warning";

      this.helperBar = this.percentOfProgressBar;
    } else {
      this.message = "Tente um numero mais baixo!";
      this.progressBarColor = "bg-warning";
      this.hidder = "";
      this.alert = "warning";
      this.helperBar = this.percentOfProgressBar;
    }
  }
}
