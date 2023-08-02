import * as React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Error from 'pages/Error';
import NotFound from 'pages/NotFound';
import TeamOverview from './pages/TeamOverview';
import Teams from './pages/Teams';
import UserOverview from './pages/UserOverview';

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Teams />,
            errorElement: <Error detail="on Teams page" />,
        },
        {
            path: '/team/:teamId',
            element: <TeamOverview />,
            errorElement: <Error detail="on Team Overview page" />,
        },
        {
            path: '/user/:useId',
            element: <UserOverview />,
            errorElement: <Error detail="on User Overview page" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]);
    return <RouterProvider router={router} />;
};

export default App;
