import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  public visible: boolean = false;;

  constructor() { }

  ngOnInit(): void {
  }

  close(visible: boolean) {
    console.log(visible);
  }
}
