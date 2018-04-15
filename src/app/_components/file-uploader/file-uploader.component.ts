import { Component, OnInit } from '@angular/core';

import { FileService, AuthenticationService } from '../../_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  isLoggedIn: any;

  constructor(
    private authService: AuthenticationService,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => this.isLoggedIn = loggedIn);

  }

  uploadFiles(files: File) {
    this.fileService.uploadFile(files[0], this.isLoggedIn.ui)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        });
  }
}
