import React from "react";
import CategoryList from "../categoryList/categoryList";

const Sidebar = () => {
    return (
    <section className="sidebar-content sidebar-content-mobil" >
        <CategoryList/>
        <div className="copyright">
            <a className="copyright-link" href="https://github.com/daswer123/Todo-React">Ссылка на репозиторий</a>
            <i style={{display:"block"}}>@Danil Boldyrev</i>
        </div>
    </section>
    )
}

export default Sidebar;

