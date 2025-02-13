import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSummernoteModule } from 'ngx-summernote';

@Component({
  selector: 'slideshow-create-slide',
  standalone: true,
  imports: [
    CommonModule,
    NgxSummernoteModule
  ],
  templateUrl: './create-slide.component.html',
  styleUrl: './create-slide.component.scss'
})
export class CreateSlideComponent {

  config: any = {
    placeholder: 'Enter here...',
    height: '500px',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo', 'fullscreen']],
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }

}
