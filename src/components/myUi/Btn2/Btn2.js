import { Lock, LockOpen } from 'lucide-react';
import React from 'react';

const Btn2 = () => {
    return (
        <button className='flex items-center cursor-pointer font-medium text-[17px] text-[white] tracking-wider pl-[0.9em] pr-[1.3em] py-[0.8em] rounded-2xl border-[none] bg-[#ad5389] bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] group'>
            <span className='rotate-[-30deg] transition-transform duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)] mr-[3px] group-hover:translate-x-[5px] group-hover:rotate-0'>
                <LockOpen className='block group-hover:hidden'/>
                <Lock className='hidden group-hover:block'/>
            </span>
            <span className='transition-transform duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[7px]'>Add Password</span>
        </button>
    )
}

export default Btn2;
