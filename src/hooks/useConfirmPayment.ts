import { useState, useEffect } from "react";
import { OrdersService } from "../services/orders.service";
import toast from "react-hot-toast";

interface Params {
    token: string | null;
}

export const useConfirmPayment = ({ token }: Params) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
      const confirmPayment = async (token?: string | null) => {
        if (!token) return;
        setLoading(true);
        setError(null);
        const { success: successConfirm, message: messageConfirm, data: dataConfirm } = await OrdersService.confirmPayment(token);
        if (successConfirm && dataConfirm) {
          toast.success(messageConfirm);
        } else {
          toast.error(messageConfirm);
          setError(messageConfirm);
        }
        setLoading(false);
      }
      confirmPayment(token);
    },[token])

    return { loading, error };
}