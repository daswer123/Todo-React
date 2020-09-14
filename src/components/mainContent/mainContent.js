import React,{Component} from "react";
import TaskList from "../taskList";
import {connect} from "react-redux";
import AddNewTask from "../addNewTask";
import {selectedCategory} from "../../actions/action"

class MainContent extends Component{

    state = {
        createPost : false
    }

    onTaskCreate = () => {
        this.setState({
            createPost : !this.state.createPost
        })
    }


    returnTaskList(category,editable = false){
        
        if (typeof(category) === "undefined"){
            return <p>В этой папке ничего нет</p>
        }
        return <TaskList 
            id = {category.id}
            name={category.name} 
            label={category.label}
            key={`${category.label}-${category.id}`}
            color={category.color}
            editable={editable}/>
            
    }

    render(){

        const {categories,activeCategory,loading} = this.props;

        if (loading){
            return <h2 className="no-content">Загрузка задач</h2>
        }

        if (categories.length === 0){
            return <h2 className="no-content">Задачи отсутствуют</h2>
        }

        const createPost = () => {
            if (this.state.createPost){
                return <AddNewTask onTaskCreate={this.onTaskCreate}/>
            }
            return (
            <div className="before-add-form">
                <button type="button" className="add-new-post-before" onClick={() => this.onTaskCreate()}>Добавить новое дело</button>
            </div>
            )
        }

        const allCategories = () =>{
            return (
                categories.map(category => {
                    return this.returnTaskList(category)
                })
            )
        }

        if (activeCategory){
            const category = categories.find(category => category.label === activeCategory);
            return (
                <section className="main-content-content">
                    {this.returnTaskList(category,true)}
                    {createPost()}
                </section>
                )
        }

        return (
            <section className="main-content-content">
                {allCategories()}
             </section>
     )
    }


    
    

}


const mapStateToProps = (state) => {
    return {
        categories : state.categories,
        activeCategory : state.activeCategory,
        loading: state.loading
    }
}

const mapDispathToProps = {
    selectedCategory,
}

export default connect(mapStateToProps,mapDispathToProps)(MainContent);