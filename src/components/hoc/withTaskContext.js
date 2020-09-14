import React from "react";
import TaskContext from "../taskContext"

const withTaskContext = () => (Wrapper) => {
    return (props) =>{
        return (
            <TaskContext.Consumer>
                {TodoInfo => {
                  return <Wrapper {...props} TodoInfo = {TodoInfo}/>
                }}
                
            </TaskContext.Consumer>
        )
    }
}

export default withTaskContext;