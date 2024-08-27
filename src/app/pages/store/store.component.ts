import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductItemComponent } from "../../components/product-item/product-item.component";
import { ProductsService } from '../../services/products.service';
import { HQ } from '../../model/hq';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../model/api.response';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../model/category';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    CommonModule,
    ProductItemComponent,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  
  list: HQ[] = [];
  minPrice: number = 0;
  maxPrice: number = 500;
  page: number = 0;
  size: number = 9;
  filterForm: FormGroup;
  searchForm: FormGroup;
  

  isFilterModalOpen = false;

  categories = Object.values(Category);


  constructor(private fb: FormBuilder, private hqService: ProductsService) {
    this.filterForm = this.fb.group({
      minPrice: [this.minPrice],
      maxPrice: [this.maxPrice]
    });

    this.searchForm = this.fb.group({
      searchName: ['']
    });
  }
  

  ngOnInit() {
    this.getAll();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.page.subscribe(() => this.getAll());
    }
  }

  getAll() {
    const pageIndex = this.paginator?.pageIndex || 0;
    const pageSize = this.paginator?.pageSize || 9;

    this.hqService.getAll(pageIndex, pageSize).subscribe({
      next: (response: ApiResponse<HQ>) => {
        this.list = response.content;
        if (this.paginator) {
          this.paginator.length = response.totalElements;
        }
      },
      error: error => {
        console.error('Error fetching products:', error);
      }
    });
  }


  applyFilter() {
    const { minPrice, maxPrice } = this.filterForm.value;
    this.hqService.filterByPrice(minPrice, maxPrice, this.page, this.size).subscribe({
      next: (response: ApiResponse<HQ>) => {
        console.log('Filtered response:', response);
        this.list = response.content;
      },
      error: error => {
        console.error('Error filtering products:', error);
      }
    });
  }

  searchByName() {
    const name = this.searchForm.get('searchName')?.value;
    this.hqService.searchByName(name, this.page, this.size).subscribe({
      next: (response: ApiResponse<HQ>) => {
        this.list = response.content || [];
      },
      error: error => {
        console.error('Erro ao buscar HQ:', error);
        this.list = [];
      }
    });
  }

  filterByCategory(category: Category) {
    this.hqService.filterByCategory(category, this.page, this.size).subscribe({
      next: (response: ApiResponse<HQ>) => {
        this.list = response.content || [];
      },
      error: error => {
        console.error('Erro ao filtrar HQs por categoria:', error);
        this.list = [];
      }
    });
  }

  resetFilters() {
    this.filterForm.reset({ minPrice: this.minPrice, maxPrice: this.maxPrice });
    this.searchForm.reset({ searchName: '' });
    
    this.getAll();
  }

  openFiltersModal() {
    this.isFilterModalOpen = true;
  }

  closeFiltersModal() {
    this.isFilterModalOpen = false;
  }
}

