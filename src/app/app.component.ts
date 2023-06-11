import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
import axios from "axios";
import { IonTextarea } from '@ionic/angular';
import { S3ServiceService } from './s3-service.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private http: HttpClient,
    private s3Service: S3ServiceService) {
  }
  isToastOpen = false;
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  results: { page_content: string } [] = [];
  @ViewChild('searchText') searchText!: IonTextarea;
  async send() {
    const textValue = this.searchText.value;
    console.log('Text value:', textValue);
    await axios.get('https://ec2-3-122-229-15.eu-central-1.compute.amazonaws.com/search?text=' + textValue)
    .then((resp) => {
      console.log(resp)
      this.results = resp.data;
      console.log(this.results)
    })
    .catch((resp) => {console.error(resp)})
    // Do something with the text value
  }
  async loadImageFromDevice(event: any) {
    // console.log(event.target)
    // this.isToastOpen = true;
    
    // const files: FileList = event.target.files;
    // const formData = new FormData();

    // for (let i = 0; i < files.length; i++) {
    // const file: File | null = files.item(i);

    // if (file) {
    //   console.log("file", file)
    //   formData.append('files', file);
    // }
    this.s3Service.uploadFile(event.target.files[0]);
  }


  //


    // await axios.post('http://ec2-3-122-229-15.eu-central-1.compute.amazonaws.com/', formData)
    // .then((resp) => {console.log(resp)})
    // .catch((resp) => {console.error(resp)})
   
}



