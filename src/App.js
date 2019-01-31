import React, {Component} from 'react';
import './scss/main.scss'
import Header from "./components/Header";
import Menu from "./components/Menu";
import Editor from "./components/Editor";


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            jsonString: '',
            mainStructName: ''
        }
    }


    onUserInput = (jsonString) => {
        this.setState({jsonString});
    };

    onMainStructNameChange = (mainStructName) => {
        this.setState({mainStructName});
    }

    render() {
        return (
            <div className="mainApp">
                <Header/>
                <Menu/>
                <Editor/>
            </div>
        );
    }
}

export default App;
