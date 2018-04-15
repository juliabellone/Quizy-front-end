import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileService {
  BASE_URL: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  uploadFile(newFile: File, userId) {
    const formData: FormData = new FormData();

    formData.append('file', newFile, newFile.name);
    return this.http.put<FormData>(`${this.BASE_URL}/user/${userId}/avatar`, formData)
      .map((file: any) => {
        return file;
        });
  };
}