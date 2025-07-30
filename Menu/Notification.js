// App.js
import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import '../i18n'; // Make sure path is correct
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('kn'); // Change to Kannada
    Alert.alert(t('alert_title'), t('alert_message'));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>{t('welcome')}</Text>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>{t('coming_soon')}</Text>
    </View>
  );
}
