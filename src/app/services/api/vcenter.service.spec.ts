import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { VcenterService } from './vcenter.service';

describe('TestService', () => {
  let service: VcenterService;
  let httpMock: HttpTestingController;
  const controller = '/api/plugin-configuration'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(VcenterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get registered center', () => {
    // const mockData = {
    //   id: 1,
    //   vcenterHostname: '10.169.435.25',
    //   username: 'admin',
    //   password: 'Passw0rd123',
    //   pluginHostname: 'hlll',
    // }
    // service.get().subscribe({
    //   next: res => {
    //     const status = res.status;
    //     const data  = res.body;
    //     expect(status).toBe(201);
    //     expect(data).toEqual(mockData);
    //   },
    //   error: err => {
    //     expect(err).toBeUndefined();
    //   }
    // });

    // const request = httpMock.expectOne(controller);
    // expect(request.request.method).toEqual('GET');
    // request.flush(mockData, {status: 201, statusText: '成功了'});
  });

  it('should fail to add', () => {
    // const formData = {
    //   id: 1,
    //   vcenterHostname: '10.169.435.25',
    //   username: 'admin',
    //   password: 'Passw0rd123',
    //   pluginHostname: 'hlll',
    // };
    // service.post(formData).subscribe((res) => {
    //   const { status, statusText} = res;
    //   expect(status).toBe(201);
    //   expect(statusText).toEqual('添加成功了');
    //   expect(statusText).toBe('添加成功了');
    // });

    // const request = httpMock.expectOne(controller);
    // expect(request.request.method).toEqual('POST');
    // request.flush({}, {status: 201, statusText: '添加成功了'})
  });
});
