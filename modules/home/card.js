import React,{ Component } from 'react'
import { StyleSheet,View,Text } from 'react-native'
import PropTypes from "prop-types"
import {
    Dimensions,
    PixelRatio,
} from 'react-native';
import { deviceWidth,deviceHeight } from "../../utils/screen"


const styles=StyleSheet.create({
    cardlist:{
        flexDirection:"row",
        // justifyContent:'space-between',
        alignItems:'stretch',
        flexWrap:'wrap'
    },
    card:{
        height:60,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:'#DDD',
        margin:'2%',
        marginRight:0,
        marginBottom:0,
        borderRadius:4,
    }
})

function fitCardWidth(screenOrientation){
    return screenOrientation.startsWith("PORTRAIT") ? '46%' : '16%'
}
 /**
 * 分区列表显示
 */
export class Card extends Component{
    static propTypes={
        card:PropTypes.object
    }
    render(){
        return (
            <Text style={[styles.card,{width:fitCardWidth(this.props.screenOrientation)}]} > {this.props.title}
                
            </Text>
        )
    }
}

export class CardList extends Component{
    static propTypes={
        cards:PropTypes.object
    }
    render(){
        return (
            <View style={styles.cardlist}>
                {this.props.cards.map((card)=>{
                    return <Card  screenOrientation={this.props.screenOrientation}  key={card.id} {...card}></Card>
                })}
            </View>
        )
    }
}