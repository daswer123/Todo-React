import React,{Component} from "react";
import {ListItem} from "@material-ui/core";
import {postStatusToggle,postDelete} from "../../actions/action";
import {connect} from "react-redux";
import withTaskContext from "../hoc";
import "./task.css";


class Task extends Component{


    componentDidMount(){
    }

    ToggleTaskStatus(){
        let {TodoInfo} = this.props
        TodoInfo = new TodoInfo();

        const {label,category,id,complited,postStatusToggle} = this.props
        const data = {
            label,
            category,
            complited : !complited,
            id
        }

        postStatusToggle(data)
        TodoInfo.toggleTask(id,JSON.stringify(data))
        .then()
    }

    deleteOneTask = () => {
        let {TodoInfo,id,postDelete} = this.props;
        TodoInfo = new TodoInfo();

        postDelete(id)
        TodoInfo.deleteTask(id)
    }

    
    render(){
    const {label,category,id,complited,postDelete} = this.props
    let completeStyle = "complited-button"

    if (complited == true){
        completeStyle += " complited";
    }

    return (
        <li       
        className={`task-item post-${category}-${id}`}
        >
                <label>
                    <button className="task-item-complite" type="button" onClick= {() => this.ToggleTaskStatus()} className={completeStyle} />
                    <p>{label}</p>
                </label>
                <button className={`task-item-delete`} type="button" onClick={() => this.deleteOneTask()}>Удалить</button>
        </li>
    )
    }
}

const mapStateToProps = state => {
    return {
        posts : state.posts
    }
}

const mapDispathToProps = {
    postStatusToggle,
    postDelete
}

export default withTaskContext()(connect(mapStateToProps,mapDispathToProps)(Task));
