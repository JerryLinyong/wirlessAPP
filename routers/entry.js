import React  from 'react';
import {  createStackNavigator } from 'react-navigation'
import MainPage from  "./main"

const EntryNavigator=createStackNavigator({
    Entry:{
        screen:MainPage
    }
},{
    initialRouteName: 'Entry'
})



export default EntryNavigator

