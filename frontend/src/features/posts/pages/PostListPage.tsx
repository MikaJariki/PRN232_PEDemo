import { useCallback, useEffect, useState } from "react";
import { App, Card, Empty, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import PostFilters from "../components/PostFilters";
import PostTable from "../components/PostTable";
import PostHero from "../components/PostHero";
import type { Post } from "../types";
import { deletePost, getPosts } from "../api/postApi";

const PostListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const debouncedSearch = useDebouncedValue(searchTerm.trim());
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPosts({
        search: debouncedSearch || undefined,
        sortDirection,
      });
      setPosts(data);
    } catch (err) {
      console.error(err);
      notification.error({
        message: "Unable to load posts",
        description: "Please verify the API is running and reachable.",
      });
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, sortDirection, notification]);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  const handleDelete = async (post: Post) => {
    try {
      await deletePost(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
      notification.success({
        message: "Post deleted",
        description: `"${post.name}" has been removed.`,
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Failed to delete post",
        description: "Please retry once the API is available.",
      });
    }
  };

  const totalPosts = posts.length;

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <PostHero
        onCreateClick={() => navigate("/posts/new")}
        total={totalPosts}
      />

      <Card className="page-card" bodyStyle={{ padding: 0 }}>
        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%", padding: 24 }}
        >
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Search & Sorting
            </Typography.Title>
            <Typography.Text type="secondary">
              Quickly drill down to the post you need by combining search, sort
              and pagination.
            </Typography.Text>
          </Space>

          <PostFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortDirection={sortDirection}
            onSortChange={setSortDirection}
            onCreate={() => navigate("/posts/new")}
          />
        </Space>
      </Card>

      <Card className="page-card table-card">
        {posts.length === 0 && !loading ? (
          <Empty
            description="No posts yet — start by creating your first one."
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <PostTable
            posts={posts}
            loading={loading}
            onEdit={(post) => navigate(`/posts/${post.id}/edit`)}
            onDelete={handleDelete}
          />
        )}
      </Card>
    </Space>
  );
};

export default PostListPage;
