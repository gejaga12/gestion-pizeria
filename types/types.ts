// types/types.ts

export type PizzaSize = 'Personal' | 'Mediana' | 'Grande' | 'Familiar';
export type PizzaType = 'Entera' | 'Mitad';

export interface CartItem {
  id: string;
  name: string;
  size?: PizzaSize;
  type?: PizzaType;
  quantity: number;
  price: number;
  notes?: string;
}
