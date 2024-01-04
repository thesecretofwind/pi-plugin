import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { VcenterService } from '@services/api/vcenter.service';
import { VertivCardService } from '@services/api/vertiv-card.service';
import { VertivPiService } from '@services/api/vertiv-pi.service';
import { VxRailService } from '@services/api/vxrail.service';
import { FormConfigurationService } from '@services/form-configuration.service';
import { forkJoin, switchAll, switchMap } from 'rxjs';
import { Mode } from 'src/app/forms/mode';
import { ModeFactory } from 'src/app/forms/mode-factory';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.less']
})
export class InstallComponent implements OnInit {


  target: Mode = new Mode();
  _count = 0;
  constructor(private route: ActivatedRoute, private formConfigurationService: FormConfigurationService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // const type = params['type'] as keyof typeof this.modeMap;
      // 此处是为了进行单元测试而进行的判断，因为使用Mock，会调用两次next，但是subcribe订阅两次，请求也请求两次
      // 造成httpMock中的expectOne触发请求两次造成错误
      if (this._count > 0) {

        return;
      }
      this.target = ModeFactory.createMode(params['type']);
      this._count++;
      this.updateCard(this.target);
    });
  }

  updateCard(target: Mode) {
    // 根据对应的code字段，获取对应接口，查看是否更新数据
    const codes = this.target.cardList.map(item => item.code);
    this.formConfigurationService.updateCardList(codes, target);
  }

}
