import React, {Component} from 'react';
import './scss/main.scss'
import Header from "./components/Header";
import Menu from "./components/Menu";
import Editor from "./components/Editor";
import jsonToGoStruct from "./logic/jsonToGoStruct";


class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            jsonString: '',
            mainStructName: '',
            isFloat32: false,
            goStructResult: ''
        };
        this.textAreaOutputRef = React.createRef();
    }


    onMainStructNameChange = (mainStructName) => {

        this.setState({mainStructName}, this.parseGoType);
    };

    onFloat32Toggle = (isFloat32) => {
        this.setState({isFloat32}, this.parseGoType);
    };

    onTextInputChange = (jsonString) => {
        this.setState({jsonString}, this.parseGoType)
    };

    onCopyToClipBoard = () =>{
        let copyText = this.textAreaOutputRef.current;
        copyText.select();
        document.execCommand("copy");
        // alert("Copied output.");
    };

    parseGoType = () => {
        let goStructResult = '';
        if (this.state.jsonString && this.state.mainStructName) {
            goStructResult = jsonToGoStruct(this.state.jsonString, this.state.mainStructName, !this.state.isFloat32).value;
        }
        this.setState({goStructResult})
    };

    render() {
        return (
            <div className="mainApp">
                <Header/>
                <Menu onMainStructNameChange={this.onMainStructNameChange} onFloat32Toggle={this.onFloat32Toggle} copyToClipBoard={this.onCopyToClipBoard}/>
                <Editor ref={this.textAreaOutputRef} onTextInputChange={this.onTextInputChange} goStructResult={this.state.goStructResult}/>
            </div>
        );
    }
}

export default App;
