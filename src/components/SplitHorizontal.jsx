
import React ,{Component} from 'react'

function SplitHorizontal (props){

        const bottom = 100 - props.topVh;

        return (
            <div className="splitHorizontal" >
                <div style={{height: `${props.topVh}vh` }}>
                    {props.children[0]}
                </div>
                <div style={{height: `${bottom}vh` }}>
                    {props.children[1]}
                </div>
            </div>
        )


}

export default SplitHorizontal;