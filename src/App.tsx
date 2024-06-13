import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Home from './routes/Home';
import Detail from './routes/Detail';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  { path: '/:id', element: <Detail /> },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
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
