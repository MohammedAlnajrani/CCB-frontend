import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cpu } from 'src/app/Model/Compatibility/cpu';
import { gpu } from 'src/app/Model/Compatibility/gpu';
import { memory } from 'src/app/Model/Compatibility/memory';
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

  chosenMM: memory = {
    Memory_Id: 0,
    memory_name: '',
    memory_size: '',
    memory_speed: '',
    manufacturer: '',
  };
  chosenGPU: gpu = {
    GPU_Id: 0,
    gpu_name: '',
    chipset: '',
    memory: '',
    core_clock: '',
    boost_clock: '',
    manufacturer: '',
  };

  socketCompatible: boolean = true;
  ddrCompatible: boolean = true;
  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.getCpuFromStorage();
    this.getMotherboardFromStorage();
    this.socketCompatibility();
    this.getGpuFromStorage();
    this.getMemoryFromStorage();
    this.ddrCompatibility();
  }

  removeFromStorage(key: string) {
    localStorage.removeItem(key);
    // this.router.navigateByUrl('/compatibility');
    window.location.reload();
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
  getGpuFromStorage() {
    if (localStorage.getItem('gpu')) {
      let gpu: any = localStorage.getItem('gpu');
      this.chosenGPU = JSON.parse(gpu);
    }
  }

  getMemoryFromStorage() {
    if (localStorage.getItem('memory')) {
      let memory: any = localStorage.getItem('memory');
      this.chosenMM = JSON.parse(memory);
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

  ddrCompatibility() {
    //and mb sockt != '' then check sockets )
    if (
      this.chosenMM.memory_speed.substring(0, 4) != '' &&
      this.chosenMB.min_memory_speed.substring(0, 4) != ''
    ) {
      if (
        this.chosenMM.memory_speed.substring(0, 4) ===
        this.chosenMB.min_memory_speed.substring(0, 4)
      ) {
        this.ddrCompatible = true;
      } else {
        this.ddrCompatible = false;
      }
    }
  }
}
