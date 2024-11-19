import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  private ButtonText : string = "Marvellous Infosystems";

  displayedText : string = this.ButtonText;

  public Uppercase(){
    this.displayedText = this.ButtonText.toUpperCase();
  }

  public Lowercase() {
   this.displayedText = this.ButtonText.toLowerCase();
  }

}