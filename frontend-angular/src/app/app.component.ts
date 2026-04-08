import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from './product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private service = inject(ProductService);

  products: Product[] = [];
  message = '';
  form: Product = { name: '', price: 0, description: '' };

  constructor() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.service.list().subscribe((data) => {
      this.products = data;
    });
  }

  editProduct(product: Product): void {
    this.form = { ...product };
  }

  resetForm(): void {
    this.form = { name: '', price: 0, description: '' };
  }

  saveProduct(): void {
    if (this.form.id) {
      this.service.update(this.form.id, this.form).subscribe(() => {
        this.message = 'Produto atualizado com sucesso.';
        this.resetForm();
        this.loadProducts();
      });
      return;
    }

    this.service.create(this.form).subscribe(() => {
      this.message = 'Produto cadastrado com sucesso.';
      this.resetForm();
      this.loadProducts();
    });
  }

  deleteProduct(id?: number): void {
    if (!id) return;
    this.service.delete(id).subscribe(() => {
      this.message = 'Produto removido com sucesso.';
      this.loadProducts();
    });
  }
}
