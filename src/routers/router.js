import {StackNavigator,navigationOptions} from 'react-navigation';
import Login from '../component/authen/Login';
import Home from '../component/Home';
const routers = StackNavigator({
    Login:{screen:Login,navigationOptions:{header: null}},
    Home:{screen:Home,navigationOptions:{header:null}}

})
export default routers;