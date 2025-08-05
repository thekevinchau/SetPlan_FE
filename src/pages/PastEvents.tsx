import React, { useState } from 'react';
import Shortcuts from '../components/Shortcuts';
import MainSideBar from '../components/MainSideBar';



export default function Announcements(){
    const [selected, setSelected] = useState<number>(1);
    return (
        <div className='min-h-screen w-full bg-slate-950 flex flex-col md:flex-row items-start pl-3 pr-3 overflow-hidden'>
            <div className='w-full md:w-1/6 lg:w-1/5 md:mr-3'>
                <MainSideBar selected={selected} setSelected={setSelected}/>
                <Shortcuts/>
            </div>
            <div className='w-full md:flex-1'>
            </div>
        </div>
    );
}