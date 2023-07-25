import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import React from 'react'
import logo from '../Components/auth/Home/img/cmr_logo_50.png' 
import useAuth from '../hooks/useAuth'

import { useSendLogoutMutation } from '../Components/auth/authApiSlice'



 const DashHeader = () => {

    const {isAdmin,isManager}=useAuth()

    const navigate = useNavigate()
   

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/login')
    }, [isSuccess, navigate])

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

   /*  if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    } */
    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )




   const content =(
    <div class="Header">
        <Link to='/dash'> 
        <img src={logo} alt='' class="logo" />
        </Link>

    <nav>
        <ul class="Header-links">
            <li><Link to='/dash/home'>Home</Link> </li>
            <li class="menu-item"><Link to="/dash/tasks">Task</Link>
                <ul class="Drop-menu-task">
                    <li class="drop-menu-item"><Link to="/dash/tasks">View task</Link></li>
                    <li class="drop-menu-item"><Link to ="/dash/tasks/new">Assign task</Link></li>
                    <li class="drop-menu-item"><a href="#Delete-task">Delete task</a></li>
                </ul>
            </li>
            {(isAdmin || isManager) &&<li><Link to='/dash/users' >View Staff</Link></li>}
            {(isAdmin || isManager) && <li><Link to="/dash/users/new">Add user</Link></li>}
            <li><a href="#optmise-task">optmise task</a></li>
            <li><a href="#About-me">About me</a></li>
            <li>{logoutButton}</li>
        </ul>
    </nav>
</div>
    )
   
   
    return content
 }
 
 export default DashHeader
 