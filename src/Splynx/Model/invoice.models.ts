export default interface InvoiceSplinx {
  custumer_id: number;
  date_created: string;
  date_updated: string;
  date_till: string;
  date_payment: string;
  status: string;
  number: string;
  payment_id: number;
  payd_from_deposit: number;
  items: {
    description: string;
    quantity: number;
    unit: number;
    price: number;
    tax: number;
    period_from: string;
    period_to: string;
    categoryIdForTransaction: number;
  }[];
  id: number;
}
