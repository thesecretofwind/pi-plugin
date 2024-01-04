import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormConfigurationService } from '@services/form-configuration.service';
import { BehaviorSubject, of, Subject } from 'rxjs'
import { DualMode } from 'src/app/forms/dual-mode';
import { LegacyMode } from 'src/app/forms/legacy-mode';
import { SingleMode } from 'src/app/forms/single-mode';
import { IvcenterInstallModel } from 'src/app/types/form';
import { ActivatedRouteMock } from 'test/ActivatedRouteMock';
import { ActivatedRouteSub } from 'test/ActivatedRouteSub';

import { InstallComponent } from './install.component';

describe('installComponent', () => {
  let component: InstallComponent;
  let fixture: ComponentFixture<InstallComponent>;
  let formConfig: FormConfigurationService;
  let route: ActivatedRoute;
  let httpMock: HttpTestingController;
  const vcenterController = '/api/plugin-configuration';
  const piController = "/api/pi-configuration";
  const activatedRoute = new ActivatedRouteMock({type: 'legacy'});

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ InstallComponent ],
      imports: [RouterTestingModule.withRoutes([]), HttpClientModule, HttpClientTestingModule],
      providers: [ FormConfigurationService, {provide: ActivatedRoute, useValue: activatedRoute},]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallComponent);
    route = TestBed.inject(ActivatedRoute);
    httpMock = TestBed.inject(HttpTestingController);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create mode class by route queryParams', () => {

    component.ngOnInit();
    expect(component.target).toBeInstanceOf(LegacyMode);

    const vcenterRequest = httpMock.expectOne(vcenterController);

    expect(vcenterRequest.request.method).toEqual('GET');

    const vcenterMockData = {
      id: 12,
      vcenterHostname: '10.169.42.1',
      username: 'admin',
      password: 'Passw0rd123',
      pluginHostname: '10.169.12.12'
    };
    const piMockData = {
      hostname: 'chengguang',
      apiKey: '123456789',
      apiSecret: '124578',
    };

    vcenterRequest.flush(vcenterMockData);


    const piRequest = httpMock.expectOne(piController);
    piRequest.flush(piMockData);

    const vcenterInputInfo = component.target.cardList[0].inputInfo;
    const piInputInfo = component.target.cardList[1].inputInfo;


    vcenterInputInfo.forEach(item => {
      const key = item.name;
      const target = vcenterMockData[key as keyof typeof vcenterMockData];
      expect(target).toEqual(item.inputContent);
    });

    piInputInfo.forEach(item => {
      const key = item.name;
      const target = piMockData[key as keyof typeof piMockData];
      expect(target).toEqual(item.inputContent);
    });


  });

});

