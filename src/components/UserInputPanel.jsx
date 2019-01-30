import React, {Component} from 'react'

class UserInputPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            jsonString: '',
            mainStructName: ''
        }
    }

    handleChange = (e) => {
        this.setState({jsonString: e.target.value}, () => {
            this.props.onTextAreaChange(this.state.jsonString);
        });

    };
    handleNameChange = (e) =>{
        this.setState({mainStructName: e.target.value} , () => {
            this.props.onMainStructNameChange(this.state.mainStructName)
        })
    };

    render() {
        return (

            <div className="userInputPanel">
                <p>Input Json</p>
                <input value={this.state.mainStructName} onChange={this.handleNameChange}/>
                <textarea value={this.state.jsonString}
                          onChange={this.handleChange}
                />
            </div>
        )
    }

}

export default UserInputPanel;