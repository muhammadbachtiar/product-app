
import { BaseResponseDto, BaseResponsePaginate } from "@/app/type/response.type";
import axiosConfig from "@/configs/axios";
import { TProduct } from "./product.type";

const ProductService = {
  getAll: async (params: any) => {
    const response = await axiosConfig.get<
      BaseResponsePaginate<TProduct[]>
    >("/products", {
      params,
    });
    return response.data;
  },
  create: async (payload: any) => {
    const response = await axiosConfig.post<BaseResponseDto<TProduct>>(
      "/product",
      payload
    );
    return response.data;
  },
  update: async ( payload: any) => {
    const response = await axiosConfig.put<BaseResponseDto<TProduct>>(
      `/product`,
      payload
    );
    return response.data;
  },
  delete: async (productId: string) => {
    const response = await axiosConfig.delete<BaseResponseDto<TProduct>>(
      `/product/${productId}`
    );
    return response.data;
  },
  getOne: async (productId: string, params?: any) => {
    const response = await axiosConfig.get<BaseResponseDto<TProduct>>(
      `/product/${productId}`,
      {
        params,
      }
    );
    return response.data;
  },
};

export default ProductService;
