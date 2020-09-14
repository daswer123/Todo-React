import React,{Component} from "react";
import {List,Button} from "@material-ui/core";
import {connect} from "react-redux";
import {categoryLoaded,selectedCategory,CategoryDelete,onCategoryLoaded} from "../../actions/action";
import withTaskContext from "../hoc";
import Category from "../category"
import AddNewCategory from "../addNewCategory"
import "./categoryList.css"

class CategoryList extends Component{
    state = {
        activeCategory : "",
        createNewCategory : false
    }

    componentDidMount(){
        
        const {categoryLoaded,TodoInfo,onCategoryLoaded} = this.props;
        const Todo = new TodoInfo();
        Todo.getAllCategories()
        .then(result => {
            categoryLoaded(result)
            onCategoryLoaded()
        })
        const {categories} = this.props;
    }


    onCreateNewCategory(){
        this.setState({
            createNewCategory : !this.state.createNewCategory
        })
    }

    deleteAllCategoryPosts(label){
        const {posts,TodoInfo} = this.props
        const Todo = new TodoInfo();

        posts.forEach(post => {
            if (post.category == label){
                Todo.deleteTask(post.id)
            }
        });
    }

    onDeleteCategory(label,id){
        const {CategoryDelete,TodoInfo,selectedCategory} = this.props
        const Todo = new TodoInfo();

        CategoryDelete(label);
        this.deleteAllCategoryPosts(label)
        selectedCategory("");
        Todo.deleteCategory(id);
    }

    render() {
        const {categories,selectedCategory,activeCategory,loading} = this.props

        const addCategoryBtn = () => {
            if (this.state.createNewCategory){
                return <AddNewCategory onCreateNewCategory={() => this.onCreateNewCategory()}/>
            } 
            return <button className="create-new-category--btn" 
            type="button"
            onClick={() => this.onCreateNewCategory()}
            >Добавить папку</button>
        }

        if (loading){
            return <h2>Загрузка</h2>
        }

        if (categories.length === 0 ){

        if (this.state.createNewCategory){
                return <AddNewCategory onCreateNewCategory={() => this.onCreateNewCategory()}/>
            } 
          return  <button className="create-new-category--btn before-all-new" 
            type="button"
            onClick={() => this.onCreateNewCategory()}
            >Добавить папку</button>
        }

        return(
            <>
            <Button color="primary" onClick={() => selectedCategory("")}>Все задачи</Button>
            <ul className="category-list">
                {categories.map(category => {

                    if (typeof(category) === "undefind"){
                        return <h2>Errorka</h2>
                    }

                    if (category.label == activeCategory){
                        return (
                            <Category {...category} key={`${category.label}-${category.id}`} 
                                className="category-item category-item-active">
                                <button className="category--delete-btn"
                                key={`${category}-btn ${category}-${category.id}-btn`} type="button"
                                onClick={() => this.onDeleteCategory(category.label,category.id)}
                                >Удалить</button>
                            </Category>
                        )
                    }
                    return <Category {...category} key={`${category.label}-${category.id}`} className="category-item"/>
                })}
             {addCategoryBtn()}
            </ul>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories : state.categories,
        activeCategory : state.activeCategory,
        posts : state.posts,
        loading : state.loading
    }
}

const mapDispatchToProps = {
    categoryLoaded,
    selectedCategory,
    CategoryDelete,
    onCategoryLoaded
}

export default withTaskContext()(connect(mapStateToProps,mapDispatchToProps)(CategoryList))