import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
import axios from "axios";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {
  }
  async loadImageFromDevice(event: any) {
    console.log(event.target)

    const files: FileList = event.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
    const file: File | null = files.item(i);

    if (file) {
      console.log("file", file)
      formData.append('files', file);
    }
  }

  await axios.post('http://ec2-3-122-229-15.eu-central-1.compute.amazonaws.com/', formData)
  }
}


