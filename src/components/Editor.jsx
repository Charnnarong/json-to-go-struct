import React, {Component} from "react";

class Editor extends Component {
    render() {
        return <div className="editor">
            <div className="editor__text_areas">
                <textarea placeholder={"Your json here."} className="editor__text_areas--input"></textarea>
                <textarea placeholder={"Generated Go struct code will appears here."} readonly="true"
                          className="editor__text_areas--output"></textarea>
            </div>
        </div>;
    }
}

export default Editor;