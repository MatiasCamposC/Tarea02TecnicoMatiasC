import { Component, inject, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { Icategory } from '../../interfaces';
import { CategoryService } from '../../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule,ModalComponent,CategoryFormComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnChanges{

  @Input() categoryList:Icategory[]=[]
  
  private categoryService=inject(CategoryService)

  public modalservice=inject(NgbModal)

  public currentCategory:Icategory={}

  @Input() permisionON:boolean=false

  showCategoryModal(category:Icategory,modal:any){
    this.currentCategory={...category};
    modal.show()
  }

  onFormCallEvent(param:any){
    this.categoryService.updateC(param)
    this.modalservice.dismissAll()
  }
  
  deleteCate(id:number){
    this.categoryService.deleteC(id)
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes["permisionON"]){
      console.log("Its Allowed",this.permisionON)
    }
  }

}
