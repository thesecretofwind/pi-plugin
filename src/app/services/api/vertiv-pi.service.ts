import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPiInstallModel } from 'src/app/types/form';

@Injectable({
  providedIn: 'root'
})
export class VertivPiService {

  private controller = "/api/pi-configuration";

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<IPiInstallModel>(`${this.controller}`, { observe: 'response' });
  }

  post(model: IPiInstallModel) {
    return this.http.post(this.controller, model,  { observe: 'response' });
  }

  put(model: IPiInstallModel) {
    return this.http.put(this.controller, model, { observe: 'response' });
  }

  delete(model: IPiInstallModel) {
    return this.http.delete(this.controller, { body: model, observe: 'response'});
  }
}
