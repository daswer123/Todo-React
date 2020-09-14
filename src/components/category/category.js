import React from "react";
import {connect} from "react-redux";
import {selectedCategory} from "../../actions/action";
import "./category.css"

const Category = ({label,color,selectedCategory,children,id,className,name}) => {

    if (name.length >= 14){
        name = name.slice(0,15)
        name += "..."
    }
    return (
        <li className={className} onClick={() => selectedCategory(label) }>
            <span className="color-circle" style={{backgroundColor : color}}/>
            <p 
            className= "category-btn"
            style={{fontWeight : "bold"}}
            >{name}</p>
            {children}
        </li>
    )
}

const mapStateToProps = (state) =>{
    return {}
}

const mapDispatchToProps = {
    selectedCategory,
}

export default connect(mapStateToProps,mapDispatchToProps)(Category)