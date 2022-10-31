import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cpu } from 'src/app/Model/Compatibility/cpu';
import { CpuService } from 'src/app/services/compatibility/cpu.service';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css'],
})
export class CpuComponent implements OnInit {
  cpuList: cpu[] = [];

  constructor(private cpuService: CpuService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCpus();
  }

  getAllCpus(): void {
    this.cpuService.getAllCpus().subscribe((res) => {
      this.cpuList = res;
    });
  }
  saveToStorage(cpu: cpu) {
    if (localStorage.getItem('cpu')) localStorage.removeItem('cpu');

    localStorage.setItem('cpu', JSON.stringify(cpu));
    this.router.navigateByUrl('/compatibility');
  }
}
