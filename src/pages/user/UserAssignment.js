import { GoMortarBoard } from "react-icons/go";
import { useParams } from "react-router-dom";
import { HiClipboardList } from "react-icons/hi";


import '../../style/style.css';

//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';

function UserAssignment() {


    const { id } = useParams();
    const [user, setUser] = useState({});
    const [assignment, setAssignment] = useState({});
    const [date,setDate] = useState("")
    
    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    let urlAs = 'http://localhost:8000/api/assignments/'+id;
    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/api/user/')
        .then((response) => {
            setUser(response.data.data);
        })

        await axios.get(urlAs)
        .then((response) => {
            setAssignment(response.data.assignment);
        })
    }
    
    //hook useEffect
    useEffect(() => {

        //check token empty
        if(!token) {

            //redirect login page
            history.push('/login');
        }
        
        //call function "fetchData"
        fetchData();
    }, []);

    //function logout
    const logoutHandler = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            //remove token from localStorage
            localStorage.removeItem("token");

            //redirect halaman login
            history.push('/login');
    };

    let photo = user.profile_photo;

    const [profile, setProfile] = useState("profile");
  
    const changeDisplay2 = () => {
     if (profile === "profile")
     {
        setProfile("profile2");}
        else{
            setProfile("profile");  
}
    };
    function changePage(){
history.push('/');
window.location.reload(false);
    }

    let total = assignment.total_marks;
    let totalMark ="";

    if(total === 100){
        totalMark = "100";
    }

    console.log(totalMark);
    
    return (
        <div className="wrapper-all">
        <div className="wrapper">
            <div>
             <nav className="nav fixed-top">
             <GoMortarBoard className='icon'/>
                <h2 onClick={changePage} className="title">Thearning</h2>
                <img src={photo} alt='img' className='prof'onClick={changeDisplay2}/>
                <div className={profile}>
                <table>
                    <tbody>
                    <tr>
                        <td><img src={photo} alt='img'className='prof2'/></td>
                    </tr>
                    <tr>
                        <td className='name'>{user.fullname}</td>
                    </tr>
                    <tr>
                        <td className='email'>{user.status}</td>
                    </tr>
                    <tr>
                        <td>
                        <button onClick={logoutHandler} className="btn btn-md btn-danger">LOGOUT</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </nav>
            </div>
            <div className="container3 v2"> 
            <div className="left-As">
                <HiClipboardList className="logo-As"/>
        <h1>{assignment.assignment_name}</h1>
        <div className="detail-As">
        <p>0/{totalMark}</p>
        </div>
        <hr></hr>
        <p>{assignment.instructions}</p>
            </div>
            <div className="right-As">
            <h1>{assignment.assignment_name}</h1>
            </div>
            </div>
        </div>
        </div>
    );

}

export default UserAssignment;