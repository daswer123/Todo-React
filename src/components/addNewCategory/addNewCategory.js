import React, { Component } from "react";
import {connect} from "react-redux";
import withTaskContext from "../hoc";
import cyrllicToTranslit from "cyrillic-to-translit-js";
import {createUnicId} from "../../services/service"
import {CategoryCreated} from "../../actions/action"
import ColorList from "../colorList";
import "./addNewCategory.css"


class AddNewCategory extends Component{


    state = {
        text : "",
        activeColor : "random"
    }


    onActiveColor(color){
        console.log(color)
        this.setState({
            activeColor : color
        })
    }

    onSubmitForm(e){
        e.preventDefault();

        let {TodoInfo,onCreateNewCategory,categories,CategoryCreated} = this.props;
        TodoInfo = new TodoInfo();

        const {text,activeColor} = this.state
        if (text === "" || activeColor === ""){
            alert("Пожалуйста введите текст или выберите цвет категории");
            return
        }

        // let color = 

        const data = {
            name : text,
            id : createUnicId(categories)
        }

        if (activeColor === "random"){
            data.color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
        } else {
            data.color = activeColor
        }

        data.label = `${cyrllicToTranslit().transform(text,"-")}-${data.id}`


        CategoryCreated(data);
        TodoInfo.addNewCategory(JSON.stringify(data));
        onCreateNewCategory();

        
    }

    onInput(e){
        this.setState({
            text : e.target.value
        })
    }
    
    render(){

    const {onCreateNewCategory} = this.props
    return (
        <section className= "add-new-category--block">
            <button className="create-new-category--btn" 
            type="button"
            onClick={onCreateNewCategory}
            >Добавить папку</button>

            <form action="#" onSubmit={(e) => this.onSubmitForm(e)} className="add-new-category--form">
                <button onClick={onCreateNewCategory} className="close-add-category">Закрыть</button>
                <input onInput={(e) => this.onInput(e)} type="text" name="category-name" placeholder="Название папки"/>
                <div className="color-type">
                    <ColorList onActiveColor={(color) => this.onActiveColor(color)} activeColor={this.state.activeColor}/>
                </div>
                <button type="submit" className="add-new-category-btn">Добавить</button>
            </form>
        </section>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        categories : state.categories
    }
}

const mapDispatchToProps = {
    CategoryCreated,
}

export default withTaskContext()(connect(mapStateToProps,mapDispatchToProps)(AddNewCategory));