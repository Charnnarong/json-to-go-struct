
import React ,{Component} from 'react'

function SplitVertical (props){
    const right = 100 - props.leftVw;
        return (
            <div className="splitVertical">
                <div style={{width: `${props.leftVw}vw` }}>
                    {props.children[0]}
                </div>
                <div style={{width: `${right}vw` }}>
                    {props.children[1]}
                </div>
            </div>
        )


}

export default SplitVertical;