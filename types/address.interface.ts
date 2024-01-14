export interface Address {
  value: number;
  label: string;

  children?: Address[];
}