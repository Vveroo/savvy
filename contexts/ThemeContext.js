 import React, { useState } from "react";
 import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

  export default function App()
   { const [temaEscuro, setTemaEscuro] = useState(false);
     const alternarTema = () => { setTemaEscuro(!temaEscuro); 

     }; 
     const estilos = temaEscuro ? estilosEscuro : estilosClaro;
      return ( 
      <View style={[styles.container, { backgroundColor: estilos.background }]}>
        <Text style={[styles.texto, { color: estilos.texto }]}> {temaEscuro ? "🌙 Modo Escuro" : "☀️ Modo Claro"} </Text>
         <TouchableOpacity style={[styles.botao, { backgroundColor: estilos.botao }]} onPress={alternarTema} > <Text style={{ color: estilos.textoBotao }}>Trocar Tema</Text>
          </TouchableOpacity>
           </View>
            ); 
        } 
        
        const estilosClaro = { 
            background: "#FFFFFF",
             texto: "#000000",
              botao: "#007BFF",
               textoBotao: "#FFFFFF",
             };
         const estilosEscuro = {
             background: "#121212",
             text: "#FFFFFF",
             bottom: "BB86FC",
             textButton: "0000000",
         }