import React from 'react';
import { createBrowserRouter } from 'react-router';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Layouts from '../Layouts/Layouts';
import Clints from '../ClintTable/Clints';
import ClintTable from '../ClintTable/ClintTable';
import Details from '../ClintTable/Details';
import Protected from './Protected';
import AddClientInfo from '../ClintTable/AddClintInfo';

const Router = createBrowserRouter([
    {
        path:'/login',
        Component:Login,
    },
    {
        path:'/',
        element:(
            <Protected>
                <Layouts></Layouts>
            </Protected>
        ),
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'all-clients',
                element:(
                    <Protected>
                        <Clints></Clints>
                    </Protected>
                )
            },
            {
                path:'client-details/:id',
                element:(
                    <Protected>
                        <Details></Details>
                    </Protected>
                )
            },
            {
                path:'add-client',
                element:(
                    <Protected>
                        <AddClientInfo></AddClientInfo>
                    </Protected>
                )
            }
        ]
    }

])

export default Router;