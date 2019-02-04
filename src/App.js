import React, {Component} from 'react';
import './scss/main.scss'
import Header from "./components/Header";
import Menu from "./components/Menu";
import Editor from "./components/Editor";
import jsonToGoStruct from "./logic/jsonToGoStruct";
import sampleInput from "./SampleInput";

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            jsonString: '',
            mainStructName: '',
            isFloat32: false,
            goStructResult: '',
            isUserSelectSample: false,
            waitingAcknowledgeCount: 0,
            isUserCopyClipBoard: false
        };
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

    onCopyToClipBoard = () => {
        this.setState({isUserCopyClipBoard: true});
    };

    parseGoType = () => {
        let goStructResult = '';
        if (this.state.jsonString && this.state.mainStructName) {
            goStructResult = jsonToGoStruct(this.state.jsonString, this.state.mainStructName, !this.state.isFloat32).value;
        }
        this.setState({goStructResult})
    };

    onSampleChange = (sample) => {
        const mainStructName = 'Select_sample_JSON' === sample ? "" : sample;
        const jsonString = 'Select_sample_JSON' === sample ? "" : sampleInput(sample);
        const waitingAcknowledgeCount = 'Select_sample_JSON' === sample ? 0 : 2; // For User's defined struct name and Text input area.
        this.setState({mainStructName, jsonString, isUserSelectSample: true, waitingAcknowledgeCount}, () => {
            this.parseGoType();
        })
    };

    onAcknowledgeUserSelectSample = () => {
        let waitingAcknowledgeCount = this.state.waitingAcknowledgeCount - 1;
        let isUserSelectSample = this.state.isUserSelectSample;
        if (waitingAcknowledgeCount <= 0) {
            isUserSelectSample = false;
            waitingAcknowledgeCount = 0;
        }
        this.setState({waitingAcknowledgeCount, isUserSelectSample});
    };

    onAcknowledgeUserCopyClipBoard = () => {
        this.setState({isUserCopyClipBoard: false});
    };

    render() {
        return (
            <div className="mainApp">
                <Header/>
                <Menu onMainStructNameChange={this.onMainStructNameChange}
                      onFloat32Toggle={this.onFloat32Toggle}
                      copyToClipBoard={this.onCopyToClipBoard}
                      onSampleChange={this.onSampleChange}

                      isUserSelectSample={this.state.isUserSelectSample}
                      userSample={this.state.mainStructName}
                      acknowledgeUserSelectSample={this.onAcknowledgeUserSelectSample}
                />
                <Editor isUserCopyClipBoard={this.state.isUserCopyClipBoard}
                        acknowledgeUserCopyClipBoard={this.onAcknowledgeUserCopyClipBoard}
                        onTextInputChange={this.onTextInputChange}
                        goStructResult={this.state.goStructResult}

                        isUserSelectSample={this.state.isUserSelectSample}
                        userSample={this.state.jsonString}
                        acknowledgeUserSelectSample={this.onAcknowledgeUserSelectSample}
                />
            </div>
        );
    }
}

export default App;
