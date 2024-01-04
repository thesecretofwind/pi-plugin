import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NzCardComponent, NzCardModule } from 'ng-zorro-antd/card';
import { ModeType } from 'src/app/types/mode';

import { SelectModeComponent } from './select-mode.component';

describe('SelectModeComponent', () => {
  let component: SelectModeComponent;
  let fixture: ComponentFixture<SelectModeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectModeComponent ],
      imports: [TranslateModule.forRoot(), RouterTestingModule.withRoutes([]), NzCardModule,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectModeComponent);
    router = TestBed.inject(Router); // 获取路由实例
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicking card element will has routing redictor', () => {
    const cardEles = fixture.debugElement.queryAll(By.directive(NzCardComponent));

    const firstCardEle = cardEles[0];
    const navigateSpy = spyOn(router, 'navigate'); // 监视路由导航方法

    expect(firstCardEle).toBeDefined();

    firstCardEle.triggerEventHandler('click', null);

    expect(navigateSpy).toHaveBeenCalledWith(['install'], {queryParams: {type: ModeType.legacy}}); // 期望的目标路由
  });

  it('will navigate to dual Mode', () => {
    const cardEles = fixture.debugElement.queryAll(By.directive(NzCardComponent));
    const dualCardEles = cardEles[cardEles.length - 1];
    const spyNavigate = spyOn(router, 'navigate');

    dualCardEles.triggerEventHandler('click', null);
    expect(spyNavigate).toHaveBeenCalledWith(['install'], {queryParams: {type: ModeType.dual}})
  });

});
