import { Pipe, PipeTransform } from '@angular/core';

const TRANSLATIONS: Record<string, string> = {
  'nav.versionLabel': 'Version 1',
  'nav.productCreation': 'Product Creation',
  'productCreation.title': 'Create product',
  'productCreation.subtitle': 'Capture core details, pricing, and media before publishing.',
  'productCreation.primaryActions': 'Primary actions',
  'productCreation.saveDraft': 'Save draft',
  'productCreation.publish': 'Publish product',
  'productCreation.backToList': 'Back to catalog',
  'productCreation.sections.basics': 'Basics',
  'productCreation.sections.pricing': 'Pricing',
  'productCreation.sections.media': 'Media & assets',
  'productCreation.sections.summary': 'Summary',
  'productCreation.fields.name': 'Product name',
  'productCreation.fields.sku': 'SKU',
  'productCreation.fields.category': 'Category',
  'productCreation.fields.status': 'Status',
  'productCreation.fields.description': 'Description',
  'productCreation.fields.price': 'Price',
  'productCreation.fields.currency': 'Currency',
  'productCreation.fields.tax': 'Tax class',
  'productCreation.fields.inventory': 'Inventory',
  'productCreation.fields.imageUpload': 'Image upload',
  'productCreation.fields.gallery': 'Gallery',
  'productCreation.fields.dimensions': 'Dimensions',
  'productCreation.fields.weight': 'Weight',
  'productCreation.placeholders.name': 'e.g. Motion desk lamp',
  'productCreation.placeholders.sku': 'SKU-0001',
  'productCreation.placeholders.description': 'Short summary of the product value.',
  'productCreation.placeholders.price': '0.00',
  'productCreation.placeholders.inventory': 'Available units',
  'productCreation.placeholders.weight': '0.0 kg',
  'productCreation.placeholders.dimensions': 'Length x Width x Height',
  'productCreation.helper.inventory': 'Leave blank to keep inventory tracked automatically.',
  'productCreation.helper.media': 'Drag and drop files or browse your library.',
  'productCreation.media.upload': 'Upload',
  'productCreation.media.imageLabel': 'IMG',
  'productCreation.media.addLabel': '+',
  'productCreation.options.category.lighting': 'Lighting',
  'productCreation.options.category.furniture': 'Furniture',
  'productCreation.options.category.accessories': 'Accessories',
  'productCreation.options.status.draft': 'Draft',
  'productCreation.options.status.ready': 'Ready for review',
  'productCreation.options.status.active': 'Active',
  'productCreation.options.currency.usd': 'USD',
  'productCreation.options.currency.eur': 'EUR',
  'productCreation.options.currency.gbp': 'GBP',
  'productCreation.options.tax.standard': 'Standard',
  'productCreation.options.tax.reduced': 'Reduced',
  'productCreation.options.tax.none': 'None',
  'productCreation.summary.heading': 'Completion checklist',
  'productCreation.summary.stepBasics': 'Basics complete',
  'productCreation.summary.stepPricing': 'Pricing configured',
  'productCreation.summary.stepMedia': 'Media uploaded',
  'productCreation.summary.stepReview': 'Ready for review',
  'productCreation.summary.info': 'Use the checklist to ensure a complete product listing.'
};

@Pipe({
  name: 'i18n',
  standalone: true
})
export class I18nPipe implements PipeTransform {
  transform(value: string): string {
    return TRANSLATIONS[value] ?? value;
  }
}
