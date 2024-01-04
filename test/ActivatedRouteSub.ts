import { convertToParamMap, ParamMap, Params } from "@angular/router";
import { ReplaySubject } from "rxjs";

// 这个文件可以专门用于测试ActivatedRoute中的paramMap的，但是建议直接在Providers，直接变成一个Subject/

export class ActivatedRouteSub {
  public subject = new ReplaySubject<ParamMap>();

  readonly paramMap = this.subject.asObservable();

  readonly queryParams = this.paramMap;

  constructor(initialParams: Params) {
    this.setParamMap(initialParams);
  }

  setParamMap(params: Params) {
    this.subject.next(convertToParamMap(params))
  }
}
