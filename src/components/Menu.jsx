import React from "react";
import githubIcon from '../githubIcon.png';

const Menu = ({onMainStructNameChange, onFloat32Toggle,copyToClipBoard}) => {

    return (
        <div className="menu">
            <input placeholder={"Enter your root struct name here."}
                   onChange={(e) => onMainStructNameChange(e.target.value)}/>
            <div className="menu__checkbox_group">
                <input type="checkbox" name="float32" onChange={(e) => onFloat32Toggle(e.target.checked)}/>
                <label htmlFor="float64">{"float32"}</label>
            </div>
            <div className="menu__btn_group">
                <div className="menu__btn_group__container">
                    <a className="menu__btn_group__container__button" onClick={copyToClipBoard}>Copy Text to Clipboard</a>
                    <a href="https://github.com/Charnnarong/json-to-go-struct">
                        <img src={githubIcon} alt="github"/>
                    </a>
                </div>
            </div>
        </div>
    );

};

export default Menu;
