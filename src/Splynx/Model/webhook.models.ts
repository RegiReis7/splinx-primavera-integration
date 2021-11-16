import SplynxPayment from "./payment.models";

export default interface SplynxWebhook {
  type: string;
  data: {
    source: string;
    model: string;
    action: string;
    date: string;
    time: string;
    administrator_id: number;
    customer_id: number;
    result: string;
    attributes: SplynxPayment;
    hook_id: number;
  };
}
