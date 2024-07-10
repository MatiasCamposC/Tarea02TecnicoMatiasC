import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icategory } from '../../interfaces';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  @Input() category:any={
    name:"",
    description:""
  }

  @Input() title:string=""

  @Output() callParentEvent:EventEmitter<Icategory>=new EventEmitter<Icategory>();

  addEditCategory(){
    this.callParentEvent.emit(this.category)
  }

}
