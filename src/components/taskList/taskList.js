import React,{Component} from "react";
import {List} from "@material-ui/core";
import {connect} from "react-redux";
import {postsLoaded,ChangeCategoryName} from "../../actions/action";
import withTaskContext from "../hoc";
import Task from "../task"
import "./taskList.css";


class TaskList extends Component{

    state = {
        categoryEdit : false,
        newCategoryName : this.props.name
    }

    componentDidMount(){
        let {TodoInfo,postsLoaded} = this.props;
        TodoInfo = new TodoInfo();
        TodoInfo.getAllPosts()
        .then(result => {
            postsLoaded(result)
        })
    }


    onCategoryEdit(){
        this.setState({
            categoryEdit: !this.state.categoryEdit
        })
    }

    onCategoryCreateName(e){
        this.setState({
            newCategoryName: e.target.value
        })
    }

    OnChangeCategoryName(){
        let {TodoInfo} = this.props;
        TodoInfo = new TodoInfo();
        const {newCategoryName} = this.state

        if (newCategoryName === ""){
            alert("Пожалуйста введите название");
            return 
            
        }

        const {color,label,id} = this.props

        const data = {color,label,id, name : newCategoryName}

        this.onCategoryEdit()
        this.props.ChangeCategoryName(data)
        TodoInfo.changeCategoryName(id,JSON.stringify(data))
    }


    render(){
        const {posts,name,label,color,editable} = this.props;

        let Header = editable ? 
        <header className="tasks-header">
             <h3 style={{color : color}}>{name}</h3> 
             <button onClick={() => this.onCategoryEdit()} type="button" className="category-edit">
             <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z" fill="#DFDFDF"/>
              </svg>
             </button>
        </header>
        : 
        <header className="tasks-header">
             <h3 style={{color : color}}>{name}</h3> 
        </header> 

        if (this.state.categoryEdit){
            Header = 
            <div className="change-category">
                 <input autoFocus type="text" defaultValue={name} onBlur={() => this.OnChangeCategoryName()} onInput={(e) => this.onCategoryCreateName(e)} style={{color: color}}/>
                 <button type="button" onClick={() => this.OnChangeCategoryName()}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M10.5,14.7928932 L17.1464466,8.14644661 C17.3417088,7.95118446 17.6582912,7.95118446 17.8535534,8.14644661 C18.0488155,8.34170876 18.0488155,8.65829124 17.8535534,8.85355339 L10.8535534,15.8535534 C10.6582912,16.0488155 10.3417088,16.0488155 10.1464466,15.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 C7.34170876,11.9511845 7.65829124,11.9511845 7.85355339,12.1464466 L10.5,14.7928932 Z"/>
                </svg>
                 </button>
            </div>
        }


        return(
            <>
                {Header}
                <ul className="task-list">
                    {
                    posts.filter(post => post.category == label)
                    .map(post =>{
                       return <Task
                        {...post}
                        id={post.id}
                        key={`post-${post.category}-${post.id}`}
                        />
                    })}
                </ul>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts : state.posts,
        categories : state.categories
    }
}

const mapDispatchToProps = {
    postsLoaded,
    ChangeCategoryName
}

export default withTaskContext()(connect(mapStateToProps,mapDispatchToProps)(TaskList));