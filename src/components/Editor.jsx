import React, {Component} from "react";

class Editor extends Component {
    // isUserCopyClipBoard
    constructor(props) {
        super(props);
        this.textAreaOutputRef = React.createRef();
        this.textAreaInputRef = React.createRef();
    }

    componentDidUpdate(prevProps) {

        if (this.props.isUserCopyClipBoard !== prevProps.isUserCopyClipBoard) {
            if (this.props.isUserCopyClipBoard) {

                let copyText = this.textAreaOutputRef.current;
                copyText.select();
                document.execCommand("copy");

                this.props.acknowledgeUserCopyClipBoard();
            }
        }
        if (this.props.isUserSelectSample) {
            this.props.acknowledgeUserSelectSample();
            this.textAreaInputRef.current.value = this.props.userSample;
        }


    }

    render() {
        const {onTextInputChange, goStructResult, isUserCopyClipBoard} = this.props;

        return (
            <div className="editor">
                <div className="editor__text_areas">
                <textarea ref={this.textAreaInputRef} placeholder={"Your json here."}
                          className="editor__text_areas--input"
                          onChange={e => onTextInputChange(e.target.value)}/>
                    <textarea ref={this.textAreaOutputRef} placeholder={"Generated Go struct code will appears here."}
                              readOnly={true}
                              className="editor__text_areas--output" value={goStructResult}/>
                </div>
            </div>
        );
    }
}


export default Editor;
