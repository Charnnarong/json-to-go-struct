import React from 'react'

function SplitHorizontal(props) {

    return (
        <div className="splitHorizontal">
            <div style={{height: `${props.topVh}vh`}}>
                {props.children[0]}
            </div>
            <div style={{height: `${props.bottomVh}vh`}}>
                {props.children[1]}
            </div>
        </div>
    )


}

export default SplitHorizontal;