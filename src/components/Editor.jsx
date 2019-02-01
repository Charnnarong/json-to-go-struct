import React from "react";

const Editor = ({onTextInputChange, goStructResult}) => {

    return (
        <div className="editor">
            <div className="editor__text_areas">
                <textarea placeholder={"Your json here."} className="editor__text_areas--input"
                          onChange={e => onTextInputChange(e.target.value)}/>
                <textarea placeholder={"Generated Go struct code will appears here."} readOnly={true}
                          className="editor__text_areas--output" value={goStructResult}/>
            </div>
        </div>
    );

};

export default Editor;
