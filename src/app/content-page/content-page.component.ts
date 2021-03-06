import { Component, OnInit, HostListener } from '@angular/core';
import { SessionClass, ContentClass } from '../Classes/model';
import { localSessionStorage } from '../data-services/localSession';
import { Router } from '@angular/router';
import { HttpServiceService } from '../data-services/http-services';
import { status } from '../home/home.component';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
})
export class ContentPageComponent implements OnInit {
  constructor(private localSession:localSessionStorage,private router: Router,private _httpservice: HttpServiceService,public sanitizer: DomSanitizer) {}
  public openModal: boolean = false;
  modelTitle: string = '';
  contentType: string ='';
  sessionVal:SessionClass;
  contentData:ContentClass[];
  videoContent: ContentClass[]=[];
  ebookContent:ContentClass[]=[];
  videoUrl:SafeResourceUrl;
  public modalWidth: number = window.innerWidth / 2;
  fileToupload:File=null;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.openModal) {
      this.modalWidth =
        window.innerWidth * 0.6 > 500 ? window.innerWidth * 0.6 : 400;
    }
  }
  ngOnInit(): void {
    this.sessionVal = this.localSession.retrieveSession();
    if(this.sessionVal == null)
    {
      this.router.navigate(['./home']);
    }
    else
    {
      this._httpservice.GetContent(this.sessionVal.country, this.sessionVal.language, this.sessionVal.board, this.sessionVal.standard,this.sessionVal.subject,this.sessionVal.chapter,this.sessionVal.chapterNo).subscribe((data: any) => {
       this.contentData = data;
       this.contentData.forEach(element => {
         if (element.content_type =="Video")
         {
           console.log(element.content_type);
           element.url = this.getId(element.url);
           this.videoContent.push(element);
         }
         else
         {
           this.ebookContent.push(element);
         }
         
       });
       console.log(data);
       if(this.contentData && this.contentData.length>0)
       {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.contentData[0].url);
        console.log(this.videoUrl);
       }
       
      },
        error => {
          console.log("Error in recieving data");
        });
      }
  }
  addVideo() {
    this.modelTitle = 'Add Video';
    this.openModal = true;
    this.contentType = "Video";
  }
  addBook() {
    this.modelTitle = 'Add Book';
    this.openModal = true;
    this.contentType = "E-Book"
  }
  closeDetails() {
    this.openModal = false;
  }
  addContent(url:string,title:string,description:string)
  {
    this.closeDetails();
    this._httpservice.addContent(this.sessionVal.country,this.sessionVal.language,this.sessionVal.board,this.sessionVal.standard,this.sessionVal.subject, this.sessionVal.chapter,this.sessionVal.chapterNo,url,title,description,this.contentType,this.fileToupload).subscribe((data: any) => {
this.fileToupload = null;
      alert((data as status).message);
    },
      error => {
        console.log("Error in recieving data");
      });
  }
  getId(url) {
    const regExp = /^.(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]).*/;
    const match = url.match(regExp);
    const watchurl = "watch?v=";
    const embedUrl ="embed/";
    return (match && match[2].length === 11)
      ? match[2]
      : url.replace(watchurl,embedUrl);
}
changeVideo(url:string)
{
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
handleFileInput(files:FileList)
{
this.fileToupload = files.item(0);
}
ChangeBook(url: string)
{
  console.log(url);
  let fileUrl:string = this._httpservice.getUrl()+url;
  
window.open(fileUrl,"_blank");
}
}
