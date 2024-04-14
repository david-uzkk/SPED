// OccurrenceScreen.js
import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

const OccurrenceScreen = () => {
  const cameraRef = useRef(null);

  const handleBarcodeRead = ({ data }) => {
    // Lógica para lidar com os dados do QR code lido
    console.log('QR Code lido:', data);
  };

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Leitor de QR Code</Text>
      </View>

      {/* Conteúdo Central */}
      <View style={styles.content}>
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          onBarCodeRead={handleBarcodeRead}
        />
        <Text style={styles.scanInstructions}>Aponte para o QR code para iniciar a leitura</Text>
      </View>

      {/* Barra Inferior */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>GCM Caraguatatuba - SP</Text>
        <Text style={styles.footerText}>©CopyRights Valência</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D214F',
  },
  header: {
    backgroundColor: '#0D214F',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '80%',
    height: '80%',
  },
  scanInstructions: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    backgroundColor: '#0D214F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default OccurrenceScreen;
