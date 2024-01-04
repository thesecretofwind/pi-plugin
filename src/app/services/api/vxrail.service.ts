import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IvxrailInstallModel } from 'src/app/types/form';

@Injectable({
  providedIn: 'root'
})
export class VxRailService {
  controller = "/api/vxrail-configuration";

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<IvxrailInstallModel>(`${this.controller}`, { observe: 'response' });
  }

  post(model: IvxrailInstallModel) {
    return this.http.post(this.controller, model,  { observe: 'response' });
  }

  put(model: IvxrailInstallModel) {
    return this.http.put(this.controller, model, { observe: 'response' });
  }

  delete(model: IvxrailInstallModel) {
    return this.http.delete(this.controller, { body: model, observe: 'response'});
  }
}
