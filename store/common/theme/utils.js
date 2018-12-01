import { CHANGE_THEME } from './actionTypes';


export const mapThemeStateToProps=(state,ownProps)=>{//mapStateToProps
    return {
        theme:state.theme
    }
}

export const mapThemeDispatchToProps=(dispatch,ownProps )=>{//mapDispatchToProps 
    return {
        changeTheme:(theme)=>dispatch({type:CHANGE_THEME,theme:theme})
    }
}