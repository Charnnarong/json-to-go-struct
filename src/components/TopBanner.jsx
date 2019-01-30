
import React ,{Component} from 'react'

class TopBanner extends Component{

    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="topBanner" style={{height: `${this.props.vh}vh` }}>
                Hello
            </div>
        )
    }

}

export default TopBanner;