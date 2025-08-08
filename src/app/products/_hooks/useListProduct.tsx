import { useQuery } from "@tanstack/react-query";
import "moment/locale/id";
import ProductService from "@/app/service/product/product.service";
import { ProductListParams } from "@/app/service/product/product.type";

function useListProduct({ limit, page, offset, search }: ProductListParams) {
  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ["PRODUCTS", page, limit, offset, search],
    queryFn: async () => {
      const response = await ProductService.getAll({
        limit,
        page,
        search,
      });
      return response;
    },
    select(data) {
      return {
        ...data,
        data: data.data.map((prod, index) => ({
          ...prod,
          no: index + 1 + limit * page - limit,
        })),
      };
    },
  });

  return {
    products,
    isLoading,
    refetch
  };
}

export default useListProduct;
