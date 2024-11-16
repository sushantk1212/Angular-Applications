import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <label class="static-label">Marvellous Infosystems</label><br/>
    <input type="text" name="statictext" id="statictext" />
  `,
  styles: [
    `label.static-label{
    font-weight: bold;
    color: blue;
  }`
  ]
})
export class AppComponent {
  title = 'MarvellousInline';
}