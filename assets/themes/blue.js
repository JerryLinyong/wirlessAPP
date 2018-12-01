import { DefaultTheme } from 'react-native-paper';

export default defaultTheme = {
    ...DefaultTheme,
    roundness: 2,
    dark:true,
    colors: {
        ...DefaultTheme.colors,
        background:"#0050b3",
        primary: '#2f54eb',
        accent: '#1890ff',
        title:"white",
        disabled:"#aaa",
        press:'#788493',
        tint:'#aaa'
    }
}