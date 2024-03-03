import { Component, OnInit } from '@angular/core';
import { Dream } from '../../models/dream';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DreamService } from '../../services/dream.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

dreams: Dream[] = [];

constructor(
  private dreamService: DreamService
){

}
  ngOnInit(): void {
    this.loadDreams();
  }

  loadDreams() {
    this.dreamService.index().subscribe(
      (dreamList) => {
        this.dreams = dreamList;
        console.log(this.dreams);
      },
      (err) => {
        console.error('DreamListComponent.loadDreams: error', err);
      }
    );
  }
}
