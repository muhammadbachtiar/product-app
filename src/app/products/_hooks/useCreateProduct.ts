"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormInstance } from "antd";
import ProductService from "@/app/service/product/product.service";
import { TProduct } from "@/app/service/product/product.type";
import { toast } from "sonner";



const useCreateProduct = (
    formInstance: FormInstance,
    setIsModalOpen: (isModalOpen: boolean) => void,
    refetch: () => void,
) => {
const queryClient = useQueryClient();
  return useMutation({
    mutationFn:  (data:  Omit<TProduct, "product_id" | "updated_timestamp" | "created_timestamp">) => {
        return ProductService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
      setIsModalOpen(false);
      formInstance.resetFields();
      refetch();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export default useCreateProduct;