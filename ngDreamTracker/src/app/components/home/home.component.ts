import { Component, NgModule, OnInit } from '@angular/core';
import { Dream, DreamEmotion, DreamType, ImgUrl } from '../../models/dream';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DreamService } from '../../services/dream.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../../app.component';

@NgModule({
  declarations: [
    // Your components
  ],
  imports: [
    // Other imported modules
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
toggleEditForm() {
throw new Error('Method not implemented.');
}

dreams: Dream[] = [];
dreamTypes = Object.values(DreamType);
dreamEmotions = Object.values(DreamEmotion);
editDream: Dream | null = null;
newDream: Dream = new Dream();
title:string = 'Dream Tracker';
selected: Dream | null = null;
updateSuccess: boolean = false;
showEditFormFlag: boolean = false;
displayEditForm: boolean = false;

constructor(
  private dreamService: DreamService){
 this.displayEditForm = false;
}
  ngOnInit(): void {
    this.loadDreams();
  }

  loadDreams() {
    this.dreamService.index().subscribe(
      (dreamList) => {
        this.dreams = dreamList;
        console.log(this.dreams);
        this.dreams.forEach(dream => {
        });
      },
      (err) => {
        console.error('DreamListComponent.loadDreams: error', err);
      }
    );
  }


  getDreamCount():number {
    return this.dreams.length;
  }

  displayDream(dream: Dream):void {
    this.selected = dream;
  }

  displayTable():void{
    this.selected = null;
  }

  addDream(dream: Dream) {
    this.dreamService.create(dream).subscribe(
      () => {
        this.loadDreams(); // Reload dreams after adding
        this.newDream = new Dream(); // Reset newDream
      },
      (error) => {
        console.error('HomeComponent.addDream: error', error);
      }
    );
  }

  setEditDream(){
  this.editDream = Object.assign({}, this.selected)
  }

  updateDream(editDream: Dream) {
    this.dreamService.update(editDream).subscribe(
      () => {
        this.loadDreams(); // Reload dreams after updating
        this.editDream = null; // Reset editDream
      },
      (error) => {
        console.error('HomeComponent.updateDream: error', error);
      }
    );
  }

  deleteDream(id: number) {
    this.dreamService.destroy(id).subscribe(
      () => {
        this.loadDreams(); // Reload dreams after deleting
      },
      (error) => {
        console.error('HomeComponent.deleteDream: error', error);
      }
    );
  }
}
