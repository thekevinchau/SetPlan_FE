import React from 'react';
import Shortcuts from '../components/Shortcuts';
import MainSideBar from '../components/MainSideBar';
import MainComponent from '../components/MainComponent';


export default function LandingPage(){
    return (
        <div className='min-h-screen w-full bg-slate-950 flex flex-col md:flex-row items-start pl-3 pr-3 overflow-hidden'>
            <div className='w-full md:w-1/3 lg:w-1/5 md:mr-3'>
                <MainSideBar/>
                <Shortcuts/>
            </div>
            <div className='w-full md:flex-1'>
                <MainComponent/>
            </div>
        </div>
    );
}