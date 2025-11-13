import { Button, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { SaveOutlined } from '@ant-design/icons';
import type { PostRequest } from '../types';

interface PostFormProps {
  form: FormInstance<PostRequest>;
  loading: boolean;
  submitLabel: string;
  onSubmit: (values: PostRequest) => void;
}

const PostForm = ({ form, loading, submitLabel, onSubmit }: PostFormProps) => (
  <Form
    layout="vertical"
    form={form}
    onFinish={onSubmit}
    initialValues={{ name: '', description: '', imageUrl: '' }}
    disabled={loading}
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[
        { required: true, message: 'Name is required.' },
        { max: 100, message: 'Name must be at most 100 characters.' }
      ]}
    >
      <Input placeholder="Post name" />
    </Form.Item>

    <Form.Item
      label="Description"
      name="description"
      rules={[
        { required: true, message: 'Description is required.' },
        { max: 1000, message: 'Description must be at most 1000 characters.' }
      ]}
    >
      <Input.TextArea placeholder="Add a detailed description" rows={4} />
    </Form.Item>

    <Form.Item
      label="Image URL"
      name="imageUrl"
      rules={[
        {
          validator: (_, value) => {
            if (!value) {
              return Promise.resolve();
            }
            try {
              new URL(value);
              return Promise.resolve();
            } catch {
              return Promise.reject(new Error('Provide a valid URL.'));
            }
          }
        }
      ]}
    >
      <Input placeholder="https://example.com/image.png (optional)" />
    </Form.Item>

    <Form.Item>
      <Button type="primary" icon={<SaveOutlined />} htmlType="submit" loading={loading}>
        {submitLabel}
      </Button>
    </Form.Item>
  </Form>
);

export default PostForm;
