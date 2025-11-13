import { Button, Card, Input, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface PostFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortDirection: "asc" | "desc";
  onSortChange: (value: "asc" | "desc") => void;
  onCreate: () => void;
}

const PostFilters = ({
  searchTerm,
  onSearchChange,
  sortDirection,
  onSortChange,
  onCreate,
}: PostFiltersProps) => (
  <Card className="filters-card" bodyStyle={{ padding: 20 }}>
    <Space style={{ width: "100%" }} wrap>
      <Input.Search
        placeholder="Search by name"
        allowClear
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        style={{ width: 260 }}
      />

      <Select
        value={sortDirection}
        onChange={onSortChange}
        options={[
          { value: "asc", label: "Sort A → Z" },
          { value: "desc", label: "Sort Z → A" },
        ]}
        style={{ width: 160 }}
      />

      <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
        Add Post
      </Button>
    </Space>
  </Card>
);

export default PostFilters;
