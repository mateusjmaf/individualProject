import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const URL_API: string = environment.restUrl;

@Injectable()
export class ServerHttpService {
  headers: Headers;
  object: Object;

  constructor(private _http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  create(object: Object, restPath: string): Observable<any> {
    return this._http.post(`${URL_API}/${restPath}`, JSON.stringify(object), { headers: this.headers})
      .map((response: Response) => {
        return response.json();
    }).catch(this.handleError);
  }

  readById(id: number, restPath: string) {
    return this._http.get(`${URL_API}/${restPath}${id}`)
      .map((response: Response) => {
        return <Object>response.json();
    }).catch(this.handleError);
  }

  readByName(name: string, restPath: string) {
    return this._http.get(`${URL_API}/${restPath}/${name}`)
      .map((response: Response) => {
        return <Object>response.json();
    }).catch(this.handleError);
  }

  readByParam(object: Object, restPath: string) {
    return this._http.post(`${URL_API}/${restPath}`, JSON.stringify(object), { headers: this.headers})
      .map((response: Response) => {
        return response.json();
    }).catch(this.handleError);
  }

  update(object: Object, restPath: string) {
    return this._http.put(`${URL_API}/${restPath}`, JSON.stringify(object), { headers: this.headers})
    .map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
  }

  delete(id: number, restPath: string) {
    return this._http.delete(`${URL_API}/${restPath}/${id}`, JSON.stringify(id))
      .map((response: Response) => {
        return response.json();
    }).catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
