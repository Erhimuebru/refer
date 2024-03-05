import React, { useState } from 'react';

import { useUser } from '../../utils/useContext';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const Navigate = useNavigate();
    const { user, handleLogout } = useUser();
    const userId = user ? user.id : localStorage.getItem('id');
    const userEmail = user && user.email;

    const displayEmail = userEmail && userEmail.includes('@') ? `${userEmail.charAt(0)}${'*'.repeat(userEmail.indexOf('@') - 2)}${userEmail.slice(userEmail.indexOf('@') - 1, userEmail.length)}` : userEmail;

    return (
        <>
            <div className="flex mt-16 mb-44 items-center justify-center">
                <div className="bg-gray-100 p-8 rounded-xl shadow-md w-80">
                    <h2 className='text-center font-bold'>My Profile</h2>

                    {/* Render user profile information */}
                    <ProfileInfo label="Firstname" value={user && user.firstname} />
                    <ProfileInfo label="Surname" value={user && user.surname} />
                    <ProfileInfo label="Mobile Number" value={user && user.phoneNumber} />
                    <ProfileInfo label="Email" value={displayEmail} />
                    <ProfileInfo label="Gender" value={user && user.gender} />
                    <ProfileInfo label="House" value={user && user.address} />
                    <ProfileInfo label="City" value={user && user.city} />
                    <ProfileInfo label="State" value={user && user.state} />
                </div>
            </div>

         
        </>
    );
}

// Component for rendering profile information
const ProfileInfo = ({ label, value }) => {
    return (
        <div className='flex items-center justify-between mt-3 mb-3'>
            <p className="text-sm text-gray-500 capitalize whitespace-nowrap">{label}</p>
            {/* Apply CSS style to prevent text overflow */}
            <p className='capitalize overflow-hidden overflow-ellipsis whitespace-nowrap ml-8'>{value}</p>
        </div>
    );
} 

export default Profile;
