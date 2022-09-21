import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private _url = "https://6078ed5ae7f4f50017184e92.mockapi.io/api/v1/todo/";

  constructor(private _httpClient: HttpClient) { }

  getItems(): Observable<any> {
    return this._httpClient.get(this._url);
  }

  getSingleItem(id: number): Observable<any> {
    return this._httpClient.get(this._url + id);
  }

  deleteItem(id: number): Observable<any> {
    return this._httpClient.delete(this._url + id);
  }

  createItem(item: any): Observable<any> {
    return this._httpClient.post(this._url, item);
  }

  editItem(item: any, id: number): Observable<any> {
    return this._httpClient.post(this._url + id, item);
  }
}
