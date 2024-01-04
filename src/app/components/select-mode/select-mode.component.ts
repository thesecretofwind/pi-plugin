import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMode, ModeType } from 'src/app/types/mode';

@Component({
  selector: 'app-select-mode',
  templateUrl: './select-mode.component.html',
  styleUrls: ['./select-mode.component.less']
})
export class SelectModeComponent implements OnInit {

  modeList: IMode[] =  [
    {
      title: 'DIRECTIONCARDPAGE.VCENTERTITLE',
      description: 'DIRECTIONCARDPAGE.VCENTERDES',
      type: ModeType.legacy,
    },
    {
      title: 'DIRECTIONCARDPAGE.SINGLEVXRAILTITLE',
      description: 'DIRECTIONCARDPAGE.SINGLEVXRAILDES',
      type: ModeType.single,
    },
    {
      title: 'DIRECTIONCARDPAGE.DUALVXRAILTITLE',
      description: 'DIRECTIONCARDPAGE.DUALVXRAILDES',
      type: ModeType.dual,
    },
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectMode(mode: IMode) {
    // console.log(mode);
    // 在第一个数组中，所有参数会组成形成需要跳转的URL
    this.router.navigate(['install'],{
      queryParams: {
        type: mode.type
      }
    });
  }
}
