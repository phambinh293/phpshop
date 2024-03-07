import React from 'react';

const CustomInput = (props) => {
    const { type, lable, i_id, i_class } = props;
    return (
        <div class="form-floating mb-3">
            <input type={type} class={`form-control ${i_class}`} id={i_id} placeholder={lable} />
                <label htmlFor={lable}>{lable}</label>
        </div>
    );
};
export default CustomInput;