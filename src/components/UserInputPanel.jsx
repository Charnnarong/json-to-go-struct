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
    handleNameChange = (e) => {
        this.setState({mainStructName: e.target.value}, () => {
            this.props.onMainStructNameChange(this.state.mainStructName)
        })
    };

    render() {

        const textHeight = this.props.vh - 1;
        return (

            <div className="userInputPanel">

                <textarea value={this.state.jsonString}
                          onChange={this.handleChange}
                          style={{
                              height: `${textHeight}vh`,
                          }}
                />
            </div>
        )
    }

}

export default UserInputPanel;