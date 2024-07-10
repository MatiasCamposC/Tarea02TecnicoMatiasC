import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Iproduct } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Input() nProduct:Iproduct={
    name:"",
    description:"",
    stock:0,
    price:0,
    category:{id:0}
  }

  @Input() title:string=""

  @Output() callParentEvent:EventEmitter<Iproduct>=new EventEmitter<Iproduct>();

  addEditProduct(){
    this.callParentEvent.emit(this.nProduct)
  }

}