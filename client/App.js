import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SectionListBasics from './pages/provList';
import {TopBar}  from './pages/topbar';


export default function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar/>
      
      <SectionListBasics/> 
      
    </SafeAreaView>


  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
