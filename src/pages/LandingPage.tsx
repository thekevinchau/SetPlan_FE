import React from 'react';
import Shortcuts from '../components/Shortcuts';
import MainSideBar from '../components/MainSideBar';
import MainComponent from '../components/MainComponent';


export default function LandingPage(){
    const [selected, setSelected] = React.useState<number>(Number(localStorage.getItem("sidebar-selected")));
    return (
        <div className='min-h-screen w-full bg-slate-950 flex flex-col md:flex-row items-start pl-3 pr-3 overflow-hidden'>
            <div className='w-full md:w-1/4 lg:w-1/5 mb-3 md:mb-0 mr-0 md:mr-3'>
                <MainSideBar selected={selected} setSelected={setSelected}/>
                <Shortcuts/>
            </div>
            <div className='md:w-3/4 lg:w-4/5'>
                <MainComponent/>
            </div>
        </div>
    );
}