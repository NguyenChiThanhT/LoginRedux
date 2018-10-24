import React,{Component} from 'react';
import {View,Text,TouchableOpacity,AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import * as LoginAction from '../redux/LoginAction';
 class Home extends Component {
        LogOut(){
          this.props.RemoveToken(this.props.navigation.navigate);
        }
        getData = async () =>{
           const value = await AsyncStorage.getItem("token");
           console.log(AsyncStorage.getItem("token"));
        }
        render(){
            return(
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text>Nguyen Chi Thanh</Text>
                    <TouchableOpacity onPress={() =>{this.LogOut()}}>
                        <Text>LogOut</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{this.getData()}}>
                        <Text>Get</Text>
                    </TouchableOpacity>
                </View>
            );
        }
}
function mapStateToProps(state) {
    return {
        isloading:state.isLoading,
        user:state.user,
        message:state.message,
        error:state.error,
        token:state.token,
    }
}
export default connect(mapStateToProps,LoginAction)(Home);