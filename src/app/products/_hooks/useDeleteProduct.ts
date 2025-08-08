import ProductService from '@/app/service/product/product.service';
import { useMutation } from '@tanstack/react-query';

const useDeleteProduct = ( 
    toast: any,
    refetch: () => void, 
    ) => {
  return useMutation({
    mutationFn: (id: string) => ProductService.delete(id),
    onSuccess: () => {
        toast.success('Product deleted successfully');  
        refetch() ;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

export default useDeleteProduct;