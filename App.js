import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View,Image,KeyboardAvoidingView } from 'react-native';
import usuarios from './bibliotecas/clases';
import Interfazadmin from './bibliotecas/interfazAdmin';
import Interfazusuario from './bibliotecas/interfazUsuario';
export default function App() {
  const [entradanom,darentradanom] =useState('');
  const [entradaclave,darentradaclave]=useState('');
  const [responseData,setResponseData] = useState(null);
  const [interId, setInterId] =useState(0);
  var usuario;
  const mostrarinterfaz= () =>{
    if(interId===3){
      return <Interfazusuario/>
    }
    else if(interId===4){
      return null;
      //encargado
    }
    else if(interId===5){
      return <Interfazadmin/>
    }
    else{
      //Logeo
      return (
        <View style={styles.container}>
          <Image source={require('./assets/logo.png/')} style={{width:200, height:200}} />
          <Text style={styles.titulo}>Iniciar sesion</Text>
          <View>
          <Text style={styles.containerInicio}>Usuario</Text>
          <TextInput id='nom_' style={styles.inputNom} maxLength={20} value={entradanom} onChangeText={actualizanom}></TextInput>
          <Text style={styles.containerInicio}>Clave</Text>
          <TextInput id='clave_' style={[styles.inputNom, styles.espaInput]} maxLength={20} secureTextEntry={true} value={entradaclave} onChangeText={actualizarclave}></TextInput>
          <Button title='Iniciar sesion' style={styles.botlogeo} onPress={FunOnpress}/>
          </View>
          <Text style={styles.copyright}>copyright © Ali Elkadri </Text> 
          <StatusBar style="auto" />
          </View>
      );
    }
  }
  const actualizanom = (text)=>{
    darentradanom(text);
  }
  const actualizarclave = (text)=>{
    darentradaclave(text);
  }
  const manipuentrada=()=>{
    console.log(entradanom);
    console.log(entradaclave);
  }
  const PostInicioSesion = async()=>{
    const ruta='http://192.168.0.103:3000/inicioSesion/';
    const data={
      usuario:entradanom,
      clave:entradaclave
    };
    try{
      const response = await fetch(ruta,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
      });
      const responseData = await response.json();
      setResponseData(responseData);
      console.log(responseData);
      if(responseData.token.tokenString){
        usuario = new usuarios(responseData.resultado.id,responseData.resultado.usuario,responseData.resultado.correo,responseData.resultado.clave,responseData.resultado.nadmin,responseData.resultado.sucursal,responseData.token.tokenString)
        setInterId(usuario.nadmin);
        usuario.mostrardatosusuarios();
      }
      else {
        usuario = new usuarios(responseData.resultado.id,responseData.resultado.usuario,responseData.resultado.correo,responseData.resultado.clave,responseData.resultado.nadmin,responseData.resultado.sucursal,responseData.token)
        setInterId(usuario.nadmin);
        usuario.mostrardatosusuarios();
      }
    }catch (error){
      console.error('Error en fetch: ',error)
    }
  };
  const FunOnpress =()=>{
    if(entradanom!='' && entradaclave!=''){
      manipuentrada();
      PostInicioSesion();
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {mostrarinterfaz()}
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0ECE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInicio:{
    paddingTop:10,
    paddingBottom:10,
  },
  espaInput:{
    marginBottom:60,
  },
  inputNom:{
    height:28,
    width:160,
    color:'black',
    borderColor:'black',
    borderWidth:1,
    borderRadius:5,
    fontSize:16,
    paddingLeft:10,
    paddingRight:10,
  },
  titulo:{
    paddingBottom:10,
    paddingTop:30,
  },
  botlogeo:{
    
  },
  copyright:{
    position: 'absolute',
    bottom: 10,
  }
});
