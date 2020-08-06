import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.watchRouter();
  }
  // 监听路由信息
  watchRouter() {
    this.router.events.subscribe((data) => {
      if (data instanceof ActivationStart) {
        const { title, } = data.snapshot.data;
        this.titleService.setTitle(title);
      }
    });
  }
}
