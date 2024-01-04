import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IvcenterInstallModel } from 'src/app/types/form';

@Injectable({
  providedIn: 'root'
})
export class VcenterService {
  private controller = '/api/plugin-configuration'

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<IvcenterInstallModel>(`${this.controller}`, {observe : 'response'});
  }

  post(model: IvcenterInstallModel) {
    return this.http.post(this.controller, model, {observe : 'response'});
  }

  put(model: IvcenterInstallModel) {
    return this.http.put(this.controller, model, {observe : 'response'});
  }


  delete(model: IvcenterInstallModel) {
    return this.http.delete(this.controller, { body: model, observe: 'response'});
  }
}
