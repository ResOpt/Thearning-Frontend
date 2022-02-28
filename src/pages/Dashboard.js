//import hook react
import React, { useState} from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';

function Dashboard() {

    //state user
    const [user] = useState({});

    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    

    //function logout
    const logoutHanlder = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch Rest API
        await axios.post('http://thearning.resultoption.tech/api/logout')
        .then(() => {

            //remove token from localStorage
            localStorage.removeItem("token");

            //redirect halaman login
            history.push('/');
        });
    };

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong>
                            <hr />
                            <button onClick={logoutHanlder} className="btn btn-md btn-danger">LOGOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Dashboard;