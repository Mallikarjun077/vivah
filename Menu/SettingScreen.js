import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const SettingScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const settingsOptions = [
    { title: t('profile'), icon: 'person-circle', screen: 'PersonalDetails' },
    { title: t('notifications'), icon: 'notifications', screen: 'Notification' },
    { title: t('language'), icon: 'language' },
    { title: t('privacy_policy'), icon: 'shield-checkmark' },
    { title: t('logout'), icon: 'log-out', screen: 'SignIn' },
  ];

  const handlePress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    } else {
      alert(t('coming_soon'));
    }
  };

  return (
    <ScrollView style={styles.container}>
      {settingsOptions.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => handlePress(item)}>
          <Ionicons name={item.icon} size={26} color="#9C854A" />
          <Text style={styles.optionText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F0E8',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1C170D',
    marginLeft: 10,
  },
});

export default SettingScreen;
