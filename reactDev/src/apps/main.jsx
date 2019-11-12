import React ,{Component} from "react";
import {render} from "react-dom";
import "./static/style/main.less"
import "./static/style/reset.css"
class Main extends Component{
	render(){
		return(
			<div className="main_wrap">
				页面主入口
			</div>
		)
	}
}
render(<Main />,document.getElementById("root"));