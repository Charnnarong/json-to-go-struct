import React, {Component} from "react";
import githubIcon from '../githubIcon.png';
class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <input placeholder={"Enter your root struct name here."}/>
                <div className="menu__checkbox_group">
                    <input type="checkbox" name="float32"/>
                    <label htmlFor="float64">{"float32"}</label>
                </div>
                <div className="menu__btn_group">
                    <a href="https://github.com/Charnnarong/json-to-go-struct">
                        <img src={githubIcon} alt="github"/>
                    </a>
                </div>
            </div>
        );
    }
}

export default Menu;