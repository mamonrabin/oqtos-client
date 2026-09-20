import Image from 'next/image';
import React from 'react';
import logo from '@/assets/logo/logo.png';
import TimerSection from './TimerSection';

const LandingPage = () => {
    return (
        <div>
            <div className="flex justify-center py-4 items-center">
                <Image src={logo} alt="Company Logo" width={100} height={100} />
            </div>
           {/* <TimerSection/> */}
        </div>
    );
};

export default LandingPage;