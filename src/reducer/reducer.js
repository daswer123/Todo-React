const initialState = {
    loading : true,
    posts : [],
    categories : [],
    activeCategory : "",
    colorPick : ["#C9D1D3","#42B883","#64C4ED","#FFBBCC","#B6E6BD","#C355F5","#09011A","#FF6464","random"],
    mode : "day"

}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case "ON_CATEGORY_LOADED":
            return {
                ...state,
                loading : false
            }

        case "CATEGORY_LOADED":
            let newArrayCategories = [];
            for (let key in action.payload){
                newArrayCategories.unshift(action.payload[key])
            }
            return {
                ...state,
                categories : newArrayCategories
            }

        case "POSTS_LOADED":
            let newArrayPosts = [];
            for (let key in action.payload){
                newArrayPosts.unshift(action.payload[key])
            }
            return {
                ...state,
                posts : newArrayPosts
            }

        case "SELECTED_CATEGORY":
            return {
                ...state,
                activeCategory : action.active
            }

        case "POST_STATUS_TOGGLED":
            const post = action.payload;
            const postIndex = state.posts.findIndex(statePost => post.id == statePost.id);
            return{
                ...state,
                posts : [
                    ...state.posts.slice(0,postIndex),
                    post,
                    ...state.posts.slice(postIndex+1)
                ]
            }
        
        case "POST_DELETED":
           const postIndex1 = state.posts.findIndex(statePost => action.postId == statePost.id);
           return {
               ...state,
               posts : [
                   ...state.posts.slice(0,postIndex1),
                   ...state.posts.slice(postIndex1+1)
               ]
           }

        case "POST_CREATED":
            const newPostArray = state.posts;
            newPostArray.push(action.payload)
            return {
                ...state,
                posts : [
                    ...newPostArray
                ]
            }

        case "CATEGORY_CREATED":
            const newCategoryArray = state.categories;
            newCategoryArray.push(action.payload)
            return {
                ...state,
                categories : [
                    ...newCategoryArray
                ]
            }
        
        case "CATEGORY_DELETED":
            const deletedCategoryIndex = state.categories.findIndex(category => category.label == action.categoryLabel)
            const postArrayDeleted = state.posts.filter(post => post.category != action.categoryLabel)
            return {
                ...state,
                posts : [
                    ...postArrayDeleted
                ],
                categories : [
                    ...state.categories.slice(0,deletedCategoryIndex),
                    ...state.categories.slice(deletedCategoryIndex+1)
                ]
            }
        
        case "CHANGE_CATEGORY_NAME":
            const categoryWithNewName = action.payload;
            const OldCategoryIndex = state.categories.findIndex(category => category.id == categoryWithNewName.id)

            return {
                ...state,
                categories : [
                    ...state.categories.slice(0,OldCategoryIndex),
                    categoryWithNewName,
                    ...state.categories.slice(OldCategoryIndex+1)
                ]
            }

        default:
            return state;
        }
    }

export default reducer;