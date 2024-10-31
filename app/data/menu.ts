export type PizzaSize = 'Personal' | 'Mediana' | 'Grande' | 'Familiar';
export type PizzaType = 'Entera' | 'Mitad';

export interface PizzaVariant {
  id: string;
  name: string;
  description: string;
  price: {
    Personal: number;
    Mediana: number;
    Grande: number;
    Familiar: number;
  };
  ingredients: string[];
  image: string;
}

export interface AdditionalTopping {
  id: string;
  name: string;
  price: number;
}

export const pizzaMenu: PizzaVariant[] = [
  {
    id: 'muzzarella',
    name: 'Muzzarella',
    description: 'Salsa de tomate, muzzarella y aceitunas',
    price: {
      Personal: 2500,
      Mediana: 3500,
      Grande: 4200,
      Familiar: 4800
    },
    ingredients: ['Salsa de tomate', 'Muzzarella', 'Aceitunas', 'Orégano'],
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500'
  },
  {
    id: 'napolitana',
    name: 'Napolitana',
    description: 'Salsa de tomate, muzzarella, tomate en rodajas y ajo',
    price: {
      Personal: 2800,
      Mediana: 3800,
      Grande: 4500,
      Familiar: 5100
    },
    ingredients: ['Salsa de tomate', 'Muzzarella', 'Tomate', 'Ajo', 'Aceitunas', 'Orégano'],
    image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=500'
  },
  {
    id: 'especial',
    name: 'Especial',
    description: 'Salsa de tomate, muzzarella, jamón y morrón',
    price: {
      Personal: 2900,
      Mediana: 3900,
      Grande: 4600,
      Familiar: 5200
    },
    ingredients: ['Salsa de tomate', 'Muzzarella', 'Jamón', 'Morrón', 'Aceitunas', 'Orégano'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500'
  },
  {
    id: 'calabresa',
    name: 'Calabresa',
    description: 'Salsa de tomate, muzzarella y longaniza',
    price: {
      Personal: 3000,
      Mediana: 4000,
      Grande: 4700,
      Familiar: 5300
    },
    ingredients: ['Salsa de tomate', 'Muzzarella', 'Longaniza', 'Aceitunas', 'Orégano'],
    image: 'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=500'
  }
];

export const additionalToppings: AdditionalTopping[] = [
  { id: 'extra-cheese', name: 'Queso Adicional', price: 500 },
  { id: 'ham', name: 'Jamón', price: 400 },
  { id: 'mushrooms', name: 'Champiñones', price: 450 },
  { id: 'olives', name: 'Aceitunas Extra', price: 300 },
  { id: 'onion', name: 'Cebolla', price: 250 },
  { id: 'bell-pepper', name: 'Morrón', price: 300 }
];

export interface Bebida {
  id: string;
  name: string;
  price: number;
  size: string;
}

export const bebidas: Bebida[] = [
  { id: 'coca-cola', name: 'Coca Cola', price: 800, size: '500ml' },
  { id: 'sprite', name: 'Sprite', price: 800, size: '500ml' },
  { id: 'fanta', name: 'Fanta', price: 800, size: '500ml' },
  { id: 'water', name: 'Agua Mineral', price: 500, size: '500ml' },
  { id: 'beer', name: 'Cerveza', price: 900, size: '350ml' }
];