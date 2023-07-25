import React from 'react'
import './home.css'
/* import logo from '../assets/img/cmr_logo_50.png'   */

import img1 from '../Home/img/img1.jpeg'
import img2 from '../Home/img/img2.jpeg'
import img3 from '../Home/img/img3.jpeg'
import img4 from '../Home/img/img4.jpeg'
import img5 from '../Home/img/img5.jpeg'
import img6 from '../Home/img/img6.jpeg'
import img7 from '../Home/img/img7.jpeg'


const Home = (userId) => {
  

  return (
    <div>
      {/*   <div class="Header">
        <img src={logo} alt='' class="logo" />
        <nav>
            <ul class="Header-links">
                <li><a href="home">Home</a></li>
                <li class="menu-item"><a href="#View-ask">Task</a>
                    <ul class="Drop-menu-task">
                        <li class="drop-menu-item"><a href="#View-task">View task</a></li>
                        <li class="drop-menu-item"><a href="#Assign-task">Assign task</a></li>
                        <li class="drop-menu-item"><a href="#Delete-task">Delete task</a></li>
                    </ul>
                </li>
                <li><a href="#View-Staff">View Staff</a></li>
                <li><a href="#Special-control">Special control</a></li>
                <li><a href="#optmise-task">optmise task</a></li>
                <li><a href="#About-me">About me</a></li>
            </ul>
        </nav>
    </div>  */}
    <div id="Home">
        <div class="container">
           
               <div class="wrapper">
                  <img class="img-carasoul" src={img1} alt=''/>
                  <img class="img-carasoul" src={img2} alt=''/>
                  <img class="img-carasoul" src={img3} alt=''/>
                  <img class="img-carasoul" src={img4} alt=''/>
                  <img class="img-carasoul" src={img5} alt=''/>
                  <img class="img-carasoul" src={img6} alt=''/>
                  <img class="img-carasoul" src={img7} alt=''/>
               </div>
            </div>
    </div>
   {/*  <div class="footer">
        <div class="cc">
        <p>Designed and Developed by: Madakari Nayak 1CR20CS107 , Tejas Hari S 1CR21AI056 and Tejas K 1CR21AI057</p>
        <br></br>
        <p>© 2023 Copyright : CMRIT- BENGALURU-37</p>
        </div>
    </div> */}
    </div>
  )
}

export default Home
