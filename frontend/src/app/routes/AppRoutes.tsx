import { Route, Routes } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import PostListPage from '../../features/posts/pages/PostListPage';
import PostFormPage from '../../features/posts/pages/PostFormPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<PostListPage />} />
      <Route path="posts/new" element={<PostFormPage mode="create" />} />
      <Route path="posts/:id/edit" element={<PostFormPage mode="edit" />} />
    </Route>
  </Routes>
);

export default AppRoutes;
