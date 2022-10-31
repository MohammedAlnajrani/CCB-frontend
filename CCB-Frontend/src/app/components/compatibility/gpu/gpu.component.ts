import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gpu } from 'src/app/Model/Compatibility/gpu';
import { GpuService } from 'src/app/services/compatibility/gpu.service';

@Component({
  selector: 'app-gpu',
  templateUrl: './gpu.component.html',
  styleUrls: ['./gpu.component.css'],
})
export class GpuComponent implements OnInit {
  gpuList: gpu[] = [];
  constructor(private gpuService: GpuService, private router: Router) {}

  ngOnInit(): void {
    this.getAllGpu();
  }

  getAllGpu() {
    this.gpuService.getAllGpu().subscribe((res) => {
      this.gpuList = res;
      console.log(res);
    });
  }

  saveToStorage(gpu: gpu) {
    if (localStorage.getItem('gpu')) localStorage.removeItem('gpu');

    localStorage.setItem('gpu', JSON.stringify(gpu));
    this.router.navigateByUrl('/compatibility');
  }
}
