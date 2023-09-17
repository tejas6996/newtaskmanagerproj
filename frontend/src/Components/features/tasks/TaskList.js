import { useGetTaskQuery } from "./tasksApiSlice"
import Tasks from "./Tasks"
import useAuth from "../../../hooks/useAuth"
import useTitle from "../../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const TaskList = () => {
    useTitle('CMRIT : Task List')

    const { email, isManager, isAdmin } = useAuth()

    const {
        data: tasks,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTaskQuery('tasksList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = tasks

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(taskId => entities[taskId].email === email)
        }

        const tableContent = ids?.length && filteredIds.map(taskId => <Tasks key={taskId} taskId={taskId} />)

        content = (
            <table className="table table--tasks">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th task__status">email</th>
                        <th scope="col" className="table__th task__created">Created</th>
                        <th scope="col" className="table__th task__updated">Updated</th>
                        <th scope="col" className="table__th task__title">Title</th>
                        <th scope="col" className="table__th task__email">Owner</th>
                        <th scope="col" className="table__th task__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default TaskList