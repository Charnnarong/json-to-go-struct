import React, {Component} from "react";

class Header extends Component {
    render() {
        return (<div className="header">
            <h1>Json to Golang's structure</h1>
            <div>
                <p>
                    This tool will try to analise an input json. It will then created an intermediate structure to
                    represent the input and finally
                    hands Go's struct(s) code back to you.<br/>
                    <br/>
                </p>
                <p>
                    Please feel free to contribute. Pull request or issue report is much appreciated.
                </p>
            </div>
        </div>);
    }
}

export default Header;