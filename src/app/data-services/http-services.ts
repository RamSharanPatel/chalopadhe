import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
const url = "https://admin.chalopadhe.com/";
@Injectable({
    providedIn: 'root'
})
export class HttpServiceService {

    constructor(private _httpServices: HttpClient) {
    }
    // public getJSON(str: string) {
    //     return this.http.get("./assets/" + str + ".json");
    // }
    getUrl()
    {
        return "https://admin.chalopadhe.com/";
    }
    login(username:string,password:string)
    {
        var postdata = new HttpParams()
        postdata = postdata.append("username", username);
        postdata = postdata.append("password", password);
        return this._httpServices.post(url + "user/admin", postdata).pipe(
            catchError(this.handleError)
        );
    }

    GetCountry(): Observable<any> {

        // var podata = new HttpParams()
        // podata = podata.append("user_id","DK00000001");
        // podata = podata.append("test_id","1");
        // var bodyData = new HttpParams()
        // .set("user_id","DK00000001")
        // .set("stars","4")
        // .set("comments","Testing");
        return this._httpServices.get(url + "content/search/country").pipe(
            catchError(this.handleError)
        )
    }
    AddCountry(country:string): Observable<any> {

        var postdata = new HttpParams()
        postdata = postdata.append("country", country);
        return this._httpServices.post(url +"content/search/country", postdata).pipe(
            catchError(this.handleError)
        );
    }
    GetLanguage(country:string)
    {
        return this._httpServices.get(url + "content/search/language?country="+country).pipe(
            catchError(this.handleError)
        )
    }
    AddLanguage(language: string) {
        var postdata = new HttpParams()
        postdata = postdata.append("language", language);
        return this._httpServices.post(url + "content/search/language", postdata).pipe(
            catchError(this.handleError)
        );
    }
    GetBoard(country:string,language:string) {
        return this._httpServices.get(url + "content/search/board?country="+country+"&language="+language).pipe(
            catchError(this.handleError)
        )
    }
    AddBoard(board:string) {
        var postdata = new HttpParams()
        postdata = postdata.append("board", board);
        return this._httpServices.post(url + "content/search/board", postdata).pipe(
            catchError(this.handleError)
        );
    }
    GetSubjects(country: string, language: string,board:string,standard:string) {
        return this._httpServices.get(url + "content/search/subject?country=" + country + "&language=" + language + "&board=" + board +"&standard="+standard).pipe(
            catchError(this.handleError)
        )
    }
    AddSubjects(subject: string) {
        var postdata = new HttpParams()
        postdata = postdata.append("subject", subject);
        return this._httpServices.post(url + "content/search/subject", postdata).pipe(
            catchError(this.handleError)
        );
    }
    Getstandard(country: string, language: string, board: string) {
        return this._httpServices.get(url + "content/search/standard?country=" + country + "&language=" + language + "&board=" + board).pipe(
            catchError(this.handleError)
        )
    }
    Addstandard(standard: string) {
        var postdata = new HttpParams()
        postdata = postdata.append("standard", standard);
        return this._httpServices.post(url + "content/search/standard", postdata).pipe(
            catchError(this.handleError)
        );
    }
    GetChapter(country: string, language: string, board: string, standard: string,subject:string) {
        return this._httpServices.get(url + "content/search/chapter?country=" + country + "&language=" + language + "&board=" + board + "&standard=" + standard +"&subject="+subject).pipe(
            catchError(this.handleError)
        )
    }
    AddChapter(chapter: string,chapterNo:string,desc:string) {

        var postdata = new HttpParams()
        postdata = postdata.append("chapter", chapter);
        postdata = postdata.append("number", chapterNo);
        postdata = postdata.append("description", desc);
        return this._httpServices.post(url + "content/search/chapter", postdata).pipe(
            catchError(this.handleError)
        );
    }
    GetContent(country: string, language: string, board: string, standard: string,subject:string,chapter:string,chapterNo:string) {
        return this._httpServices.get(url + "content/search/content?country=" + country + "&language=" + language + "&board=" + board + "&standard=" + standard +"&subject="+subject+"&chapter="+chapter+"&number="+chapterNo).pipe(
            catchError(this.handleError)
        )
    }
    addContent(country: string, language: string, board: string, standard: string,subject:string,chapter:string,chapterNo:string,contentUrl:string,title:string,description:string,contenttType:string,fileToUpload:File) {
        // var postdata = new HttpParams()
        // postdata = postdata.append("country", country);
        // postdata = postdata.append("language",language);
        // postdata = postdata.append("board", board);
        // postdata = postdata.append("standard", standard);
        // postdata = postdata.append("subject", subject);
        // postdata = postdata.append("chapter", chapter);
        // postdata = postdata.append("url", contentUrl);
        // postdata = postdata.append("title", title);
        // postdata = postdata.append("description", description);
        // postdata = postdata.append("number", chapterNo);
        // postdata = postdata.append("content_type", contenttType);
        var formData = new FormData();
        formData.append("country", country);
        formData.append("language",language);
        formData.append("board", board);
        formData.append("standard", standard);
        formData.append("subject", subject);
        formData.append("chapter", chapter);
        formData.append("url", contentUrl);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("number", chapterNo);
        formData.append("content_type", contenttType);
        
        //console.log(country+" "+language+" "+board+" "+standard+" "+subject+" "+chapter+" "+title+" "+url+" "+description+"gfhgs   "+fileToUpload.name );

        if (fileToUpload == null) {
            return this._httpServices.post(url + "content/search/content", formData).pipe(
                catchError(this.handleError)
            )
        }
        else {
            formData.append("file", fileToUpload, fileToUpload.name);
            return this._httpServices.post(url + "content/search/file", formData).pipe(
                catchError(this.handleError)
            )
        }
       
    }
    SuscribeEmail(emailid: string) {
        var pstData = new HttpParams();
        pstData = pstData.append("email", emailid);
        return this._httpServices.post(url + "contact/chalopadhe/", pstData).pipe(
            catchError(this.handleError)
        );
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}