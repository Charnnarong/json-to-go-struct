import React, {Component} from 'react';
import './scss/main.scss'


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
                <div className="header">
                    <p>THis is header</p>
                </div>
                <div className="menu">
                    <p>this is menu</p>
                </div>
                <div className="editor">
                    <div className="editor__text_areas">
                        <textarea className="editor__text_areas--input"></textarea>
                        <textarea className="editor__text_areas--output"></textarea>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
