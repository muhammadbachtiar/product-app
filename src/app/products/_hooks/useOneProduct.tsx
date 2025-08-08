import { useQuery } from "@tanstack/react-query";
import "moment/locale/id";
import ProductService from "@/app/service/product/product.service";
import { ProductListParams } from "@/app/service/product/product.type";


function useOneProduct(product_id : string) {
  const { data: product, isLoading } = useQuery({
    queryKey: ['article', product_id],
    queryFn: () =>ProductService.getOne(product_id),
    enabled: !!product_id,
  });


  return {
    product,
    isLoading
  };
}

export default useOneProduct;


