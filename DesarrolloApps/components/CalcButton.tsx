import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';

const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4;

interface CalcButtonProps {
  title: string;
  onPress: (value: string) => void;
  isWide?: boolean;
  type?: 'action' | 'operator' | 'default';
}

export const CalcButton = ({ title, onPress, isWide, type = 'default' }: CalcButtonProps) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(title);
  };

  let bgColor = '#333333';
  let textColor = '#FFFFFF';

  if (type === 'action') {
    bgColor = '#A5A5A5';
    textColor = '#000000';
  } else if (type === 'operator') {
    bgColor = '#FF9F0A';
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bgColor },
        isWide && styles.wideButton,
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: Math.floor(buttonWidth - 20),
    height: Math.floor(buttonWidth - 20),
    borderRadius: Math.floor(buttonWidth),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 32,
  },
  wideButton: {
    width: Math.floor(buttonWidth * 2 - 20),
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
});