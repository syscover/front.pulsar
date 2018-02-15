import { print } from 'util';
import { DataJson } from './../../shared/classes/properties';
import { Lang, Country, Attachment } from './../admin/admin.models';

export class Category {
    ix: number;
    id: number;
    lang_id: string;
    lang: Lang;
    parent: number;
    name: string;
    slug: string;
    active: boolean;
    description: string;
    data_lang: string;
    data: string;
}

export class CustomerClassTax {
    id: number;
    name: string;
}

export class ProductClassTax {
    id: number;
    name: string;
}

export class GroupCustomerClassTax {
    group_id: number;
    customer_class_tax_id: number;
}

export class TaxRateZone {
    id: number;
    name: string;
    country_id: string;
    country: Country;
    territorial_area_1_id: string;
    territorial_area_2_id: string;
    territorial_area_3_id: string;
    zip: string;
    tax_rate: string;
}

export class TaxRule {
    id: number;
    name: string;
    translation: string;
    priority: number;
    sort: number;
    customer_class_taxes: CustomerClassTax[];
    product_class_taxes: ProductClassTax[];
    tax_rate_zones: TaxRateZone[];
}

export class ProductType {
    id: number;
    name: string;
}

export class PriceType {
    id: number;
    name: string;
}

export class OrderStatus {
    ix: number;
    id: number;
    lang_id: string;
    lang: Lang;
    name: string;
    active: boolean;
    data_lang: string;
}

export class PaymentMethod {
    id: number;
    lang_id: string;
    lang: Lang;
    name: string;
    order_status_successful_id: number;
    minimum_price: number;
    maximum_price: number;
    instructions: string;
    sort: number;
    active: boolean;
    data_lang: string;
}

export class Product {
    id: number;
    lang_id: string;
    code: string;
    lang: Lang;
    categories: Category[];
    name: string;
    slug: string;
    description: string;
    field_group_id: number;
    type_id: number;
    parent_id; number;
    weight: number;
    active: boolean;
    sort: number;
    price_type_id: number;
    subtotal: number;
    product_class_tax_id: number;
    attachments: Attachment[];
    data_lang: string;
    data: DataJson;
}

export class Warehouse {
    id: number;
    name: string;

    // geolocation data
    country_id: string;
    territorial_area_1_id: string;
    territorial_area_2_id: string;
    territorial_area_3_id: string;
    zip: string;
    locality: string;
    address: string;
    latitude: string;
    longitude: string;

    active: boolean;
}

export class Stock {
    id: number;
    warehouse_id: number;
    product_id: number;
    stock: number;
    minimum_stock: number;
}

export class Order {
    id: number;
    date: any;
}

export class OrderRow {
    id: number;
    lang_id: string;
    order_id: number;
    product_id: number;
    name: string;
    description: string;
    price: number;
}

export class DiscountType {
    id: number;
    name: string;
}

export class CartPriceRurle {
    id: number;
    names: string;
    descriptions: string;
    active: boolean;
    group_ids: string;
    customer_ids: string;
    combinable: boolean;
    priority: number;
    has_coupon: boolean;
    coupon_code: string;
    coupon_uses: number;
    customer_uses: number;
    total_uses: number;
    enable_from: string;
    enable_to: string;
    condition_rules: string;
    discount_type_id: number;
    discount_fixed_amount: number;
    discount_percentage: number;
    maximum_discount_amount: number;
    apply_shipping_amount: boolean;
    free_shipping: boolean;
    product_rules: string;
    data_lang: string;
}
