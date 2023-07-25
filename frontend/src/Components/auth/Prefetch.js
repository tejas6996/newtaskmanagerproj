import { store } from '../app/store'
 import { tasksApiSlice } from '../features/tasks/tasksApiSlice' 
import { usersApiSlice } from '../features/users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(tasksApiSlice.util.prefetch('getTask', 'tasksList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch