import React from "react";


const ColorItem = ({color,onActiveColor,className}) => {
    if (color == "random"){
       return <button className={className} onClick={() => onActiveColor(color)} type="button" 
        style={{background : "linear-gradient(45deg,red, orange , yellow,  cyan, blue, violet)"}}
        >R</button>
    }
    return (
        <button className={className} onClick={() => onActiveColor(color)} type="button" 
        style={{backgroundColor : color}}
        ></button>
    )
}

export default ColorItem