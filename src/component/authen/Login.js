import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity,ActivityIndicator,Modal,AsyncStorage} from 'react-native';
import CheckBox from 'react-native-check-box'
import * as LoginAction from '../../redux/LoginAction';
import {connect} from 'react-redux';
class Login extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            username: 'admin@admin.com',
            password: 'adminadmin',
            isChecked:false,
            hide:true
        }
    }
    componentWillMount(){
          this.props.LoginToken(this.props.navigation.navigate);
       //  AsyncStorage.multiGet(['username', 'password','check']).then((data) => {
       //          username = data[0][1];
       //          password = data[1][1];
       //          isChecked = data[2][1];
       //       // this.setState({
       //       //     username:username,
       //       //     password:password,
       //       //     isChecked:isChecked
       //       // })
       //  });
    }
    CallAPILogin() {
        const {username,password} = this.state;
        this.props.LoginUser(username,password,this.props.navigation.navigate);
        //LoginAction.navigate("Home");JSON.stringify(isChecked)
    }
    Rememer = async () =>{
        const {username,password,isChecked} = this.state;
        if(!isChecked){
            this.setState({
                isChecked:!this.state.isChecked
            });
            console.log(isChecked);
            try {
                await AsyncStorage.multiSet([["username",username],["password",password],["check",JSON.stringify(isChecked)]]);
            } catch (error) {
                console.log(error);
            }
        }else {
            alert("xoa")
        }

    }

    render() {
        const {isloading,error} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={{color:"red",marginTop:50,textAlign:"center",fontSize:20}}>{error}</Text>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Username"
                        placeholderTextColor="red"
                        onChangeText={(text) => this.setState({username: text})}
                        value={this.state.username}
                    />
                    <TextInput
                        secureTextEntry={this.state.hide}
                        style={styles.textinput}
                        placeholder="Password"
                        placeholderTextColor="red"
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}
                    />
                    <View style={{flexDirection:"row",marginTop:20,alignSelf: "flex-end"}}>
                        <Text style={{fontSize:20,color:"red"}}>
                            Remember this?
                        </Text>
                        <CheckBox
                            onClick={()=>{this.Rememer()}}
                            isChecked={this.state.isChecked}
                            rightText={"CheckBox"}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.CallAPILogin()
                        }}
                        style={styles.buttonLogin}>
                        <Text style={styles.textLogin}>Login</Text>
                    </TouchableOpacity>
                </View>
                <Modal visible={isloading} transparent={true}>
                    <View style={{flex:1,}}>
                        <View style={{flex:1,}}>
                        </View>
                        <View style={{flex:2,justifyContent:"center"}}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View>
                        <View style={{flex:1}}>
                        </View>
                    </View>
                </Modal>
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
export default connect(mapStateToProps,LoginAction)(Login);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "pink",
    },
    content: {
        flex: 1,
        margin: 20,
        justifyContent: "center"
    },
    textinput: {
        marginTop: 20,
        height: 50,
        width: "100%",
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: "white",
        textAlign: "center",
        fontSize: 20,
        color: "red"
    },
    buttonLogin: {
        backgroundColor: "blue",
        height: 50,
        marginTop: 20,
        alignItems: 'center',
        padding: 10
    },
    textLogin: {
        fontSize: 20,
        color: "white"
    }
});
