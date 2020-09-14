import React,{Component} from "react";
import withTaskContext from "../hoc";
import {connect} from "react-redux";
import {postCreated} from "../../actions/action";
import {createUnicId} from "../../services/service";
import "./addNewTask.css";

class AddNewTask extends Component{
    
    state = {
        text : "",
    }


    onAddTask = (e) =>{
        let {TodoInfo,ActiveCategory,posts,onTaskCreate,postCreated} = this.props;
        TodoInfo = new TodoInfo();

        e.preventDefault();
        if (this.state.text === ""){
            alert("Пожалуйста введите текст");
            return
        }
        
        const data = {
            label : this.state.text,
            category : ActiveCategory,
            complited : false,
            id : createUnicId(posts)
        }

        postCreated(data)
        TodoInfo.addNewTask(JSON.stringify(data));
        onTaskCreate();
    }

    onChangeText = (e) => {
        this.setState({
            text : e.target.value
        })
    }


    render() {

    let {onTaskCreate} = this.props;
    return (
        <form className="add-form" onSubmit={(e) => this.onAddTask(e)}>
            <input className="add-form-input" autoFocus  placeholder="Текст задачи" type="text" name="label" onInput={(e) => this.onChangeText(e)}/>
            <div className="add-form-buttons">
                <button className="add-form-add" type="submit">Добавить</button>
                <button className="add-form-cancel" type="button" onClick={() => onTaskCreate()}>Отменить</button>
            </div>
        </form>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        posts : state.posts,
        ActiveCategory : state.activeCategory
    }
}

const mapDispathToProps = {
    postCreated
}
 
export default withTaskContext()(connect(mapStateToProps,mapDispathToProps)(AddNewTask))