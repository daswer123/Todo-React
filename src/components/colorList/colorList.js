import React,{Component} from "react";
import {connect} from "react-redux";
import ColorItem from "../colorItem";
import "./colorList.css"

class ColorList extends Component{


    

    render(){
    
    return (
        <ul className="circle-list">
           {this.props.colors.map( (color,id) => {
               if(this.props.activeColor == color){
                    return <ColorItem  className="color-circles active"
                    onActiveColor={this.props.onActiveColor}
                    color = {color}
                    key={`${color}-${id}`}/>
               }
               return <ColorItem  className="color-circles" onActiveColor={this.props.onActiveColor} color = {color} key={`${color}-${id}`}/>
           })}
        </ul>
    )
        }
}

const mapStateToProps = (state) =>{
    return {
        colors : state.colorPick
    }
}

export default connect(mapStateToProps)(ColorList)