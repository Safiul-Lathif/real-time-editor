
import React from 'react'
import divider from "../assets/divider.png";


const HorizontalDivider = () => {
    return (
        <img src={divider} alt="divider" style={{
            transform: 'rotate(180deg)',
            height: 30,
            width: 1,
        }} />
    )
}

export default HorizontalDivider;