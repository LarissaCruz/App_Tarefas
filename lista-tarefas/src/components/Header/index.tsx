import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const CustomHeader = ({ title }: { title: string }) => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#ff7e5f', '#ffffff']} style={styles.header}>
      <View style={styles.headerContent}>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 20, // Espaçamento entre o botão de voltar e o título
  },
  title: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 25,
    color: '#000000',
    flex: 1, // Ocupa o espaço restante
    textAlign: 'center', // Centraliza o título
  },
});

export default CustomHeader;
