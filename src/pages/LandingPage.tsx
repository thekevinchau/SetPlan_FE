import React from 'react';
import Shortcuts from '../components/Shortcuts';
import MainSideBar from '../components/MainSideBar';


export default function LandingPage(){
    return (
        <div className='border h-screen w-screen bg-gray-900 flex items-start '>
            <div className='w-1/5 h-full ml-4 mr-3 border-white'>
                <MainSideBar/>
                <Shortcuts/>
            </div>
            <div className='w-full h-full rounded-lg mt-4 mr-2 text-white bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-600/20 '>hey guys</div>
        </div>
    );

}