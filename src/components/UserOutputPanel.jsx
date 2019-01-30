import React, {Component} from 'react'

import jsonToGoStruct from "../logic/jsonToGoStruct"

function UserOutputPanel(props) {

    let result = "";

    if(props.mainStructName){

        const values = jsonToGoStruct(props.jsonInput , props.mainStructName);
        result = values["value"];
    }

    const textHeight = props.vh - 1;

    return (
        <div className="userOutputPanel">
            <textarea value={result} readOnly={true}
                      style={{height: `${textHeight}vh`}}
            />
        </div>
    )


}

export default UserOutputPanel;