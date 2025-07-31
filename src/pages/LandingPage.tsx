import React from 'react';
import Shortcuts from '../components/Shortcuts';
import MainSideBar from '../components/MainSideBar';


export default function LandingPage(){
    return (
        <div className='border h-screen w-screen bg-gray-900'>
            <div className='w-1/4 border-white h-screen'>
                <MainSideBar/>
            </div>
        </div>
    );

}