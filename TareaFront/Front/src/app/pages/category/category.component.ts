import { Component, inject, OnInit } from '@angular/core';
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CategoryService } from '../../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryListComponent,CategoryFormComponent,LoaderComponent,ModalComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
 
  public categoryService=inject(CategoryService)
  public modalservice=inject(NgbModal)
  public route:ActivatedRoute=inject(ActivatedRoute)
  public autServices:AuthService=inject(AuthService)
  public routeAuthorities:string[]=[]
  public permisionON:boolean=false

  onFormCallEvent(param:any){
    this.categoryService.saveC(param)
    this.modalservice.dismissAll()
  }

  ngOnInit(): void {
    this.categoryService.getC();
    this.autServices.getUserAuthorities();
    this.route.data.subscribe((data)=>{
      this.routeAuthorities=data["authorities"]?data["authorities"]:[]
      this.permisionON=this.autServices.areActionsAvailable(this.routeAuthorities)
    })
  }
}
