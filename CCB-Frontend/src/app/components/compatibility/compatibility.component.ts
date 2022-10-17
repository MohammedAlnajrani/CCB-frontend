import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cpu } from 'src/app/Model/Compatibility/cpu';
import { mb } from 'src/app/Model/Compatibility/motherboard';

@Component({
  selector: 'app-compatibility',
  templateUrl: './compatibility.component.html',
  styleUrls: ['./compatibility.component.css'],
})
export class CompatibilityComponent implements OnInit {
  chosenCPU: cpu = {
    cpu_name: '',
    cpuImage: '',
    socket: '',
    cores: '',
    manufacturer: '',
    core_clock: '',
    boost_clock: '',
  };
  chosenMB: mb = {
    mb_name: '',
    socket: '',
    manufacturer: '',
    min_memory_speed: '',
  };

  socketCompatible: boolean = true;
  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.getCpuFromStorage();
    this.getMotherboardFromStorage();
    this.socketCompatibility();
    console.log(this.socketCompatible);
  }

  removeFromStorage(key: string) {
    localStorage.removeItem(key);
    this.router.navigateByUrl('/compatibility');
  }

  getCpuFromStorage() {
    if (localStorage.getItem('cpu')) {
      let cpu: any = localStorage.getItem('cpu');
      this.chosenCPU = JSON.parse(cpu);
    }
  }

  getMotherboardFromStorage() {
    if (localStorage.getItem('mb')) {
      let mb: any = localStorage.getItem('mb');
      this.chosenMB = JSON.parse(mb);
    }
  }

  socketCompatibility() {
    //and mb sockt != '' then check sockets )
    if (this.chosenCPU.socket != '' && this.chosenMB.socket != '') {
      if (this.chosenCPU.socket === this.chosenMB.socket) {
        this.socketCompatible = true;
      } else {
        this.socketCompatible = false;
      }
    }
  }
}
