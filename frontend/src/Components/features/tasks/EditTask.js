import { useParams } from 'react-router-dom'
import EditTaskForm from './EditTaskForm'
import { useGetTaskQuery } from './tasksApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../../hooks/useTitle'

const EditTask = () => {
    useTitle('CMRIT: Edit Task')

    const { id } = useParams()

    const { email, isManager, isAdmin } = useAuth()

    const { task } = useGetTaskQuery("tasksList", {
        selectFromResult: ({ data }) => ({
            task: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!task || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (task.email !== email) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditTaskForm task={task} users={users} />

    return content
}
export default EditTask