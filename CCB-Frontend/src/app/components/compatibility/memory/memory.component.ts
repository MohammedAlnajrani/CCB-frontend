import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { memory } from 'src/app/Model/Compatibility/memory';
import { MemoryService } from 'src/app/services/compatibility/memory.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css'],
})
export class MemoryComponent implements OnInit {
  memoryList: memory[] = [];
  constructor(private memoryService: MemoryService, private router: Router) {}

  ngOnInit(): void {
    this.getAllMemory();
  }
  getAllMemory() {
    this.memoryService.getAllMemory().subscribe((res) => {
      this.memoryList = res;
    });
  }

  saveToStorage(memory: memory) {
    if (localStorage.getItem('memory')) localStorage.removeItem('memory');

    localStorage.setItem('memory', JSON.stringify(memory));
    this.router.navigateByUrl('/compatibility');
  }
}
