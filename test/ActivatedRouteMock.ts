import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export class ActivatedRouteMock {
  private _queryParams: BehaviorSubject<Params>;

  constructor(initialParams?: Params) {
    this._queryParams = new BehaviorSubject<Params>(initialParams || {});
  }

  get queryParams() {
    return this._queryParams.asObservable();
  }

  setQueryParams(params: Params) {
    console.log('aaa');

    this._queryParams.next(params);
  }
}
