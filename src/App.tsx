import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from './layouts/AppLayout';
import { BasicPage } from './pages/examples/BasicPage';
import { ConditionalPage } from './pages/examples/ConditionalPage';
import { CustomPage } from './pages/examples/CustomPage';
import { ExamplesIndexPage } from './pages/examples/ExamplesIndexPage';
import { FormComposerItemsPage } from './pages/examples/FormComposerItemsPage';
import { ListPage } from './pages/examples/ListPage';
import { NestedListPage } from './pages/examples/NestedListPage';
import { RegisteredInputsPage } from './pages/examples/RegisteredInputsPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="examples" element={<ExamplesIndexPage />} />
        <Route path="examples/basic" element={<BasicPage />} />
        <Route
          path="examples/registered-inputs"
          element={<RegisteredInputsPage />}
        />
        <Route path="examples/conditional" element={<ConditionalPage />} />
        <Route path="examples/list" element={<ListPage />} />
        <Route path="examples/nested-list" element={<NestedListPage />} />
        <Route path="examples/custom" element={<CustomPage />} />
        <Route
          path="examples/form-composer-items"
          element={<FormComposerItemsPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
