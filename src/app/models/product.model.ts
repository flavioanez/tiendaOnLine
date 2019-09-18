export class Producto {
    constructor(
        public title: string,
        public medida: string,
        public descriptiondetailed: string,
        public priceventa: number,
        public pricediscount: number,
        public pricefinal: number,
        public priceventamayorista: number,
        public pricediscountmayorista: number,
        public pricefinalmayorista: number,
        public iva: number,
        public points: number,
        public code: string,
        public categories: string,
        public subcategories: string,
        public clientempresario: string,
        public clientmayorista: string,
        public stock: number,
        public photo: string) { }
}
