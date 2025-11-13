import { useEffect, useState } from "react";
import {
  App,
  Button,
  Card,
  Divider,
  Form,
  Space,
  Steps,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PostForm from "../components/PostForm";
import type { PostRequest } from "../types";
import { createPost, getPost, updatePost } from "../api/postApi";

interface PostFormPageProps {
  mode: "create" | "edit";
}

const PostFormPage = ({ mode }: PostFormPageProps) => {
  const [form] = Form.useForm<PostRequest>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const isEdit = mode === "edit";
  const { notification } = App.useApp();

  useEffect(() => {
    if (!isEdit || !id) {
      return;
    }

    const loadPost = async () => {
      try {
        setLoading(true);
        const post = await getPost(Number(id));
        form.setFieldsValue({
          name: post.name,
          description: post.description,
          imageUrl: post.imageUrl ?? "",
        });
      } catch (err) {
        console.error(err);
        notification.error({
          message: "Failed to load post",
          description: "Please try again from the list view.",
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [form, id, isEdit, navigate, notification]);

  const handleSubmit = async (values: PostRequest) => {
    try {
      setLoading(true);
      if (isEdit && id) {
        await updatePost(Number(id), values);
        notification.success({
          message: "Post updated",
          description: `"${values.name}" was updated successfully.`,
        });
      } else {
        await createPost(values);
        notification.success({
          message: "Post created",
          description: `"${values.name}" is now in the list.`,
        });
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      notification.error({
        message: "Save failed",
        description: "Please verify the API is running and retry.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card className="page-card">
        <Space
          align="center"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <div>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {isEdit ? "Edit Post" : "Create Post"}
            </Typography.Title>
            <Typography.Text type="secondary">
              {isEdit
                ? "Modify the post details below."
                : "Fill in the details to add a new post."}
            </Typography.Text>
          </div>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/")}>
            Back to list
          </Button>
        </Space>

        <Divider style={{ margin: "16px 0" }} />
        <Steps
          current={isEdit ? 1 : 0}
          items={[
            { title: "Create", description: "Compose a new post" },
            { title: "Review", description: "Confirm details and publish" },
          ]}
        />
      </Card>

      <Card className="page-card">
        <PostForm
          form={form}
          loading={loading}
          submitLabel={isEdit ? "Save Changes" : "Create Post"}
          onSubmit={handleSubmit}
        />
      </Card>
    </Space>
  );
};

export default PostFormPage;
