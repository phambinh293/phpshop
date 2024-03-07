import React from 'react';
import CustomInput from '../components/CustomInput';

const Forgotpassword = () => {
    return <div className='py-5 bg-yl min-h'>
        <br />
        <br />
        <br />
        <div className='my-5 w-25 bg-white rounded-3 mx-auto p-3 mt-3'>
            <h3 className='text-center'>Forgot Password</h3>
            <br />
            <form action=''>
                <CustomInput type="email" lable="Email Address" id="id_email"></CustomInput>
                <button className='bg-yl border-0 px-3 py-2 text-white fw-bold w-100' type='submit'>Send</button>
            </form>
        </div>
    </div>;
};

export default Forgotpassword;