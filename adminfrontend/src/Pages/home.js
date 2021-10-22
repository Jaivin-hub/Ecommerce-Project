import React from 'react';
import Navbar from '../Components/Navbar';

function Home(){
    return(
        <div>
            <Navbar/>
            <div className="home">
            <img style={{width: '100%'}} src="https://thumbs.dreamstime.com/b/admin-message-working-office-table-background-93379017.jpg" alt="" />
        </div>
        </div>
        
    )
}

export default Home;

