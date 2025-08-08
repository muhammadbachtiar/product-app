"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormInstance } from "antd";
import ProductService from "@/app/service/product/product.service";
import { TProduct } from "@/app/service/product/product.type";
import { toast } from "sonner";

const useUpdateProduct = (
    formInstance: FormInstance,
    setIsModalOpen: (isModalOpen: boolean) => void,
    setEditingProduct: (editingProduct: TProduct | null) => void,
    refetch: () => void
) => {
const queryClient = useQueryClient();
  return useMutation({
    mutationFn:  (data:  TProduct) => {
        return ProductService.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
      setIsModalOpen(false);
      setEditingProduct(null);
      formInstance.resetFields();
      refetch();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export default useUpdateProduct;