import { Button, Card, Space, Statistic, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface PostHeroProps {
  total: number;
  onCreateClick: () => void;
}

const PostHero = ({ total, onCreateClick }: PostHeroProps) => (
  <Card className="hero-card" bordered={false}>
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Typography.Title
          level={2}
          style={{ margin: 0, color: "#fff", letterSpacing: 0.5 }}
        >
          Post Manager
        </Typography.Title>
        <Typography.Paragraph
          style={{ color: "rgba(255,255,255,0.82)", maxWidth: 520 }}
        >
          Clean, exam-ready interface for browsing, creating, editing, and
          deleting posts.
        </Typography.Paragraph>
      </div>
      <Space size="large" wrap>
        <Statistic
          title={
            <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>
              Total posts
            </span>
          }
          value={total}
          valueStyle={{ color: "#fff", fontSize: 32 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={onCreateClick}
        >
          Add Post
        </Button>
      </Space>
    </Space>
  </Card>
);

export default PostHero;
