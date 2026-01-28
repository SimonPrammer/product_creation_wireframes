import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18nPipe } from '../../shared/i18n.pipe';

@Component({
  selector: 'app-v1-product-creation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, I18nPipe],
  templateUrl: './v1.component.html',
  styleUrl: './v1.component.scss'
})
export class V1Component {
  private readonly formBuilder = inject(FormBuilder);

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required]],
    sku: ['', [Validators.required]],
    category: ['lighting'],
    status: ['draft'],
    description: [''],
    price: ['', [Validators.required]],
    currency: ['USD'],
    taxClass: ['standard'],
    inventory: [''],
    weight: [''],
    dimensions: [''],
    imageUpload: [''],
    gallery: ['']
  });

  constructor() {}
}
