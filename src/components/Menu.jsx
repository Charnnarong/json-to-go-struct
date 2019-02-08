import React, {Component} from "react";
import githubIcon from '../githubIcon.png';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: "Select_sample_JSON"
        }
        this.inputRef = React.createRef();
    }

    onSelectChange = (event) => {
        this.setState({selectedValue: event.target.value}, () => {
            this.props.onSampleChange(this.state.selectedValue);
        });

    };

    componentDidUpdate(prevProps) {
        if (this.props.isUserSelectSample !== prevProps.isUserSelectSample) {
            if (this.props.isUserSelectSample) {
                this.props.acknowledgeUserSelectSample();
                this.inputRef.current.value = this.props.userSample;
            }
        } else if (this.props.userSample === "") {
            this.inputRef.current.value = "";
        }
    }

    render() {
        let {onMainStructNameChange, onFloat32Toggle, copyToClipBoard} = this.props;

        return (
            <div className="menu">

                <input ref={this.inputRef} placeholder={"Enter your root struct name here."}
                       onChange={(e) => onMainStructNameChange(e.target.value)}/>

                <div className="menu__checkbox_group">

                    <input type="checkbox" name="float32" onChange={(e) => onFloat32Toggle(e.target.checked)}/>

                    <label htmlFor="float64">{"float32"}</label>
                    <select value={this.state.selectedValue} onChange={this.onSelectChange}>
                        <option value="Select_sample_JSON">Select sample JSON</option>
                        <option value="Simple_JSON">Simple JSON</option>
                        <option value="Recursive_JSON">Recursive JSON</option>
                        <option value="More_Complex">More Complex</option>
                    </select>

                </div>
                <div className="menu__btn_group">
                    <div className="menu__btn_group__container">
                        <button className="menu__btn_group__container__button" onClick={copyToClipBoard} >Copy Text to
                            Clipboard</button>
                        <a href="https://github.com/Charnnarong/json-to-go-struct">
                            <img src={githubIcon} alt="github"/>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

}

export default Menu;
