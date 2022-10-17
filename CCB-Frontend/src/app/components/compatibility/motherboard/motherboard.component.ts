import { Component, OnInit } from '@angular/core';
import { mb } from 'src/app/Model/Compatibility/motherboard';
import { Router } from '@angular/router';
import { MbService } from 'src/app/services/compatibility/mb.service';
@Component({
  selector: 'app-motherboard',
  templateUrl: './motherboard.component.html',
  styleUrls: ['./motherboard.component.css'],
})
export class MotherboardComponent implements OnInit {
  mbList: mb[] = [];

  constructor(private mbService: MbService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.getAllMbs();
  }

  getAllMbs(): void {
    this.mbService.getAllMbs().subscribe((res) => {
      this.mbList = res;
    });
  }
  saveToStorage(mb: mb) {
    if (localStorage.getItem('mb')) localStorage.removeItem('mb');

    localStorage.setItem('mb', JSON.stringify(mb));
    this.router.navigateByUrl('/compatibility');
  }
}
