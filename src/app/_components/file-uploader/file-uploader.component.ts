import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthenticationService } from '../../_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  @Output() onUpload = new EventEmitter<File>();
  
  constructor() { }

  ngOnInit() { }

  uploadFiles(files: File) {
    this.onUpload.emit(files);
  }
}
