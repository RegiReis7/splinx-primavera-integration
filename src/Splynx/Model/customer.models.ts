export default interface SplynxCustomer {
  id: number;
  login: string;
  status: string;
  partner_id: number;
  location_id: number;
  password: string;
  name: string;
  email: string;
  billing_email: string;
  phone: string;
  category: string;
  street_1: string;
  street_2?: string;
  zip_code: string;
  city: string;
  date_add: string;
  gps: string;
  mrr_total: number;
  billing_type: string;
  added_by: string;
  added_by_id: number;
  last_online: string;
  last_update: string;
  daily_prepaid_cost: number;
  additional_attributes: {
    numero_de_identificacao_fiscal: string;
  };
}
