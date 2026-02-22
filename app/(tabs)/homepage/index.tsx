import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

import { LanguageContext } from "@/context/languageContext";
import { getParams } from "@/lib/api";
import { background } from "@/lib/theme";
import { ParamsResponse } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useContext, useEffect, useState } from "react";

export default function Homepage() {
  const languageContext = useContext(LanguageContext);
  const [loading, setLoading] = useState(false)

  const checkCache = async () => {
    const language = await AsyncStorage.getItem('language')
    if (language) {
      languageContext?.setSelectedLanguage(language)
    }

    const currency = await AsyncStorage.getItem('currency')
    if (currency) {
      languageContext?.setSelectedCurrency(currency)
    }
  }

  useEffect(() => {
    setLoading(true)
    getParams().then((params: ParamsResponse) => {
      const currenciesArray: any[] = []
      const languagesArray: any[] = []
      Object.keys(params.data.currencies).forEach(key => {
        currenciesArray.push({ label: key, value: params.data.currencies[key] })
      });
      Object.keys(params.data.languages).forEach(key => {
        languagesArray.push({ label: key, value: params.data.languages[key] })
      });

      languageContext?.setCurrencies(currenciesArray);
      languageContext?.setLanguages(languagesArray);
      setLoading(false)
    });

    checkCache()
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <EditScreenInfo path="app/(tabs)/homepage/index.tsx" /> */}
      <View style={styles.pickerContainer}>
        <View style={styles.pickerItem}>
          <Text>Language</Text>
          <Picker
            selectedValue={languageContext?.selectedLanguage}
            onValueChange={(itemValue, itemIndex) => {
              languageContext?.setSelectedLanguage(itemValue)
              AsyncStorage.setItem('language', itemValue)
            }
            }>
            {
              languageContext?.languages?.map((language: { value: string, label: string }) => (
                <Picker.Item label={language.value} value={language.label} key={language.label} />
              ))
            }
          </Picker>
        </View>
        <View style={styles.pickerItem}>
          <Text>Currency</Text>
          <Picker
            selectedValue={languageContext?.selectedCurrency}
            onValueChange={(itemValue) => {
              languageContext?.setSelectedCurrency(itemValue)
              AsyncStorage.setItem('currency', itemValue)
            }
            }>
            {
              languageContext?.currencies?.map((currency: any) => (
                <Picker.Item label={currency.value} value={currency.label} key={currency.label} />
              ))
            }
          </Picker>
          {loading && <ActivityIndicator size={'large'} />}
        </View>
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: background.secondary,
    padding: 6,
    height: '100%',
    justifyContent: 'flex-start'
  },
  pickerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 20
  },
  pickerItem: {
    flex: 1,
    marginRight: 10,
  }
});
