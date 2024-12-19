import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarvellousService } from './marvellous.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

   coursesdata : any;

  constructor(private Marservice : MarvellousService)  {
    this.Marservice.getBatches().subscribe(data => {
      this.coursesdata = data;
    })
  }

}