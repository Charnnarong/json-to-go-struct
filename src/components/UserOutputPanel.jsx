import React, {Component} from 'react'

import jsonToGoStruct from "../logic/jsonToGoStruct"

function UserOutputPanel(props) {

    return (
        <div className="userOutputPanel">
            <p>Output Json</p>
            <textarea value={ jsonToGoStruct(props.jsonInput , props.mainStructName)} readOnly={true}/>
        </div>
    )


}

export default UserOutputPanel;