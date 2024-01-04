import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICardInstallModel } from 'src/app/types/form';

@Injectable({
  providedIn: 'root'
})
export class VertivCardService {
  controller = "/api/card-configuration";

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<ICardInstallModel>(`${this.controller}`, { observe: 'response' });
  }

  post(model: ICardInstallModel) {
    return this.http.post(this.controller, model,  { observe: 'response' });
  }

  put(model: ICardInstallModel) {
    return this.http.put(this.controller, model, { observe: 'response' });
  }

  delete(model: ICardInstallModel) {
    return this.http.delete(this.controller, { body: model, observe: 'response'});
  }
}
