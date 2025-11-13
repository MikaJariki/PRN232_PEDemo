import { Button, Image, Popconfirm, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import type { Post } from "../types";

interface PostTableProps {
  posts: Post[];
  loading: boolean;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => Promise<void>;
}

const PostTable = ({ posts, loading, onEdit, onDelete }: PostTableProps) => {
  const columns: ColumnsType<Post> = useMemo(
    () => [
      {
        title: "Image",
        dataIndex: "imageUrl",
        key: "imageUrl",
        width: 120,
        render: (value: string | null | undefined) =>
          value ? (
            <Image
              width={80}
              height={80}
              src={value}
              alt="Post image"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Tag color="default">No image</Tag>
          ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (text: string) => (
          <Typography.Paragraph ellipsis={{ rows: 2, tooltip: text }}>
            {text}
          </Typography.Paragraph>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        width: 200,
        render: (_, record) => (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>
              Edit
            </Button>
            <Popconfirm
              title={`Delete "${record.name}"?`}
              description="This action cannot be undone."
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              onConfirm={() => onDelete(record)}
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [onEdit, onDelete],
  );

  return (
    <Table<Post>
      rowKey="id"
      size="middle"
      bordered={false}
      loading={loading}
      columns={columns}
      dataSource={posts}
      pagination={{ pageSize: 6, hideOnSinglePage: true }}
      locale={{ emptyText: "No posts to display yet." }}
    />
  );
};

export default PostTable;
