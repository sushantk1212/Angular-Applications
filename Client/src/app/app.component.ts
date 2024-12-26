import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { MarvellousService } from './marvellous.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers : [FormBuilder,Validators]
})

export class AppComponent {

   isDataVisible: boolean = false;
   coursesdata : any;

   private fb = new FormBuilder();

    constructor(private Marservice : MarvellousService)  {}

    insertBatches = this.fb.group(
      {
      Name: ['', Validators.required],
      Fees: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Duration: ['', Validators.required]
    }
  );

    onSubmitBatch() {
      if (this.insertBatches.valid) {
        this.Marservice.addCourse(this.insertBatches.value).subscribe(
          response => {
            console.log('Course saved successfully:', response);
            this.insertBatches.reset();
          },
          error => {
            console.error('Error saving course:', error);
          }
        );
      }
    } // onSubmit ends here
    

    readData() {
      this.Marservice.getBatches().subscribe(data => {
        this.coursesdata = data;
        this.isDataVisible = true;
      })
    }

}