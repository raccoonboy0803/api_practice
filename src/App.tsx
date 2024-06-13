import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Home from './routes/Home';
import Detail from './routes/Detail';
import Login from './routes/Login';
import Layout from './routes/Layout';
import Profile from './routes/Profile';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './util/api';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: '/:id', element: <Detail /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
  { path: '/login', element: <Login /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  ${reset}
  *{box-sizing: border-box}
  body{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;  
    background-color: rgb(48,196,182);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;
