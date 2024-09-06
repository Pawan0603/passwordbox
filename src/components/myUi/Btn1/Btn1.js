import React from 'react'
import style from "./Btn1.css";
import { ArrowRight } from 'lucide-react';

const Btn1 = (props) => {
    return (
        <button className="btn btn_primary flex items-center gap-2">
            <span className="btn_txt">{props.btnName}</span>
            <ArrowRight size={16} />
        </button>

    )
}

export default Btn1