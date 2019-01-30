import React, {Component} from 'react'

import jsonToGoStruct from "../logic/jsonToGoStruct"

function UserOutputPanel(props) {

    let result = "";

    if(props.mainStructName){

        const values = jsonToGoStruct(props.jsonInput , props.mainStructName);
        result = values["value"];
    }



    return (
        <div className="userOutputPanel">
            <p>Output Json</p>
            <textarea value={result} readOnly={true}/>
        </div>
    )


}

export default UserOutputPanel;