"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Pagination,
  Space,
  Typography,
} from "antd";
import { TProduct } from "../../service/product/product.type";
import useListProduct from "../_hooks/useListProduct";
import useCreateProduct from "../_hooks/useCreateProduct";
import useUpdateProduct from "../_hooks/useUpdateProduct";
import useDeleteProduct from "../_hooks/useDeleteProduct";
import { toast } from "sonner";

export default function ProductsPage() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TProduct | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const { products, isLoading, refetch } = useListProduct({
    limit,
    page,
    search,
  });

  const { mutate: createProduct, isPending: isCreatePending } =
    useCreateProduct(form, setIsModalOpen, refetch);
  const { mutate: updateProduct, isPending: isUpdatePneding } =
    useUpdateProduct(form, setIsModalOpen, setEditingProduct, refetch);
  const { mutate: deleteProduct } = useDeleteProduct(toast, refetch);

  const columns = [
    {
      title: "Product Title",
      dataIndex: "product_title",
      key: "product_title",
      render: (text: string) => (
        <Typography.Text strong>{text}</Typography.Text>
      ),
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "product_price",
      render: (price: number) => (
        <Typography.Text type="secondary">${price.toFixed(2)}</Typography.Text>
      ),
    },
    {
      title: "Category",
      dataIndex: "product_category",
      key: "product_category",
      render: (text: string) => (
        <Typography.Text type="secondary">{text || "-"}</Typography.Text>
      ),
    },
    {
      title: "Description",
      dataIndex: "product_description",
      key: "product_description",
      render: (text: string) => (
        <Typography.Text type="secondary">{text || "-"}</Typography.Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TProduct) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingProduct(record);
              form.setFieldsValue(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              if (confirm("Are you sure you want to delete this product?")) {
                deleteProduct(record.product_id);
              }
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSubmit = (
    values: Omit<
      TProduct,
      "product_id" | "updated_timestamp" | "created_timestamp"
    >
  ) => {
    if (editingProduct) {
      updateProduct({
        ...values,
        product_id: editingProduct.product_id,
        created_timestamp: editingProduct.created_timestamp,
        updated_timestamp: new Date().toISOString(),
      });
    } else {
      createProduct(values);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
   
      <div className="mb-4 flex justify-between items-center gap-x-2">
        <Input.Search
          value={search}
          onChange={handleSearch}
          placeholder="Search products"
          className="w-fit flex-1"
        />
        <Button
          type="primary"
          onClick={() => {
            setEditingProduct(null);
            form.resetFields();

            setIsModalOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Create Product
        </Button>
      </div>

      <Table
        dataSource={products?.data}
        columns={columns}
        rowKey="product_id"
        loading={isLoading}
        pagination={false}
        className="mb-4"
      />

      <div className="flex justify-end">
        <Pagination
          current={page}
          total={products?.pagination.total}
          pageSize={limit}
          onChange={(page) => setPage(page)}
          showSizeChanger={false}
        />
      </div>

      <Modal
        title={editingProduct ? "Edit Product" : "Create Product"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="product_title"
            label="Product Title"
            rules={[
              { required: true, message: "Please input the product title!" },
            ]}
          >
            <Input placeholder="Enter product title" />
          </Form.Item>
          <Form.Item
            name="product_price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber
              min={0}
              step={0.01}
              precision={2}
              className="w-full"
              placeholder="Enter price"
            />
          </Form.Item>
          <Form.Item name="product_category" label="Category">
            <Input placeholder="Enter category" />
          </Form.Item>
          <Form.Item name="product_description" label="Description">
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
          <Form.Item name="product_image" label="Image URL">
            <Input placeholder="Enter image URL" />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingProduct(null);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isCreatePending || isUpdatePneding}
              >
                {editingProduct ? "Update" : "Create"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
