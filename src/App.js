import React, {Component} from 'react';
import './scss/main.scss'
import SplitHorizontal from './components/SplitHorizontal'
import SplitVertical from './components/SplitVertical'
import UserOutputPanel from './components/UserOutputPanel'
import UserInputPanel from './components/UserInputPanel'
import Head from './components/Head'

class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            jsonString: '',
            mainStructName: ''
        }
    }

    onUserInput = (jsonString) =>{
        this.setState({jsonString});
    };

    onMainStructNameChange  = (mainStructName) =>{
        this.setState({mainStructName});
    }

    render() {
        return (
            <div className="mainApp">
                <SplitHorizontal topVh={20}>
                    <Head/>
                    <SplitVertical leftVw={50}>
                        <UserInputPanel onTextAreaChange={this.onUserInput} onMainStructNameChange={this.onMainStructNameChange}>
                            input
                        </UserInputPanel>
                        <UserOutputPanel jsonInput={this.state.jsonString} mainStructName={this.state.mainStructName}>
                            output
                        </UserOutputPanel>
                    </SplitVertical>
                </SplitHorizontal>
            </div>
        );
    }
}

export default App;
