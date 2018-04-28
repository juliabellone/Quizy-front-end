import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  @Input() buttonLiteral: string;
  @Output() onUpload = new EventEmitter<File>();
  
  constructor() { }

  ngOnInit() { }

  uploadFiles(files: File) {
    this.onUpload.emit(files);
  }
}
