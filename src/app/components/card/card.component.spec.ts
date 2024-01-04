import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { FormConfigurationService } from '@services/form-configuration.service';
import { IFormCard } from 'src/app/types/form';

import { CardComponent } from './card.component';

describe('cardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let formBuilder: FormBuilder;
  let formConfig: FormConfigurationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, TranslateModule.forRoot()],
      providers: [ FormConfigurationService, FormBuilder, ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    formConfig = TestBed.inject(FormConfigurationService);
    // 初始化父组件传入变更的_card属性，以及其生成cardForm表单FormGroup(相当于默认值)，否则会报错
    component._card = {} as IFormCard;
    component.cardForm = formBuilder.group({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should watch the change of card and generate  formControls of cardForm ', () => {
    const spySetter = spyOnProperty(component, 'card', 'set').and.callThrough();
    const mockData = FormConfigurationService.installCardStoreList[0];

    component.card = mockData;

    // 验证是否触发setter
    fixture.detectChanges();
    expect(spySetter).toHaveBeenCalled();
    expect(component._card).toEqual(mockData);

    // 验证触发setter后，是否按预期创建表单
    const inputs = mockData.inputInfo;
    const formControls = Object.keys(component.cardForm.controls);

    inputs.forEach(item => {
      expect(formControls).toContain(item.name);
      const control = component.cardForm.get(item.name);

      expect(control?.value).toEqual(item.inputContent);
    });
  })

});
