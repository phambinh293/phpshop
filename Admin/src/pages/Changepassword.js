import React from 'react';
import CustomInput from '../components/CustomInput';

const Changepassword = () => {
    return <div className='py-5 bg-yl min-h'>
        <br/>
        <br />
        <br />
        <div className='my-5 w-25 bg-white rounded-3 mx-auto p-3 mt-3'>
            <h3 className='text-center'>Change Password</h3>
            <br />
            <form action=''>
                <CustomInput type="password" lable="Password" id="id_password"></CustomInput>
                <hr/>
                <CustomInput type="password" lable="New Password" id="id_newpassword"></CustomInput>
                <CustomInput type="password" lable="Confirm Password" id="id_confirmpassword"></CustomInput>
                <button className='bg-yl border-0 px-3 py-2 text-white fw-bold w-100' type='submit'>Change</button>
            </form>
        </div>
    </div>;
};

export default Changepassword;