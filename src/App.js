import React, {Component} from 'react';
import './scss/main.scss'
import SplitHorizontal from './components/SplitHorizontal'
import SplitVertical from './components/SplitVertical'
import UserOutputPanel from './components/UserOutputPanel'
import UserInputPanel from './components/UserInputPanel'
import TopBanner from './components/TopBanner'
import * as PropTypes from "prop-types";
import UserInputMenu from "./components/UserInputMenu";




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
                <TopBanner vh={20}/>
                <SplitHorizontal topVh={10} bottomVh={70}>
                    <UserInputMenu/>
                    <SplitVertical leftVw={50}>
                        <UserInputPanel onTextAreaChange={this.onUserInput}
                                        onMainStructNameChange={this.onMainStructNameChange} vh={70}/>
                        <UserOutputPanel jsonInput={this.state.jsonString} mainStructName={this.state.mainStructName} vh={70}/>
                    </SplitVertical>
                </SplitHorizontal>
            </div>
        );
    }
}

export default App;
