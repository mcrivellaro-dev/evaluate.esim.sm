import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { LanguageContext } from "@/context/languageContext";
import { getCountries } from "@/lib/api";
import { background, border, radius, text } from "@/lib/theme";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";

export default function Countries() {
  const languageContext = useContext(LanguageContext);
  const [countries, setCountries] = useState<any[]>([])
  const [filteredCountries, setFilteredCountries] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (languageContext?.selectedCurrency && languageContext?.selectedLanguage) {
      setLoading(true)
      getCountries('language=' + languageContext?.selectedLanguage + '&' + 'currency=' + languageContext?.selectedCurrency).then(countries => {
        setCountries(countries.data)
        setFilteredCountries(countries.data)
        setLoading(false)
      })
    }
  }, [languageContext?.selectedCurrency, languageContext?.selectedLanguage])

  useEffect(() => {
    if (searchTerm.length) {
      const filteredCountries: any[] = []
      for (let i = 0; i < countries.length; i++) {
        let found = false
        for (let j = 0; !found && j < countries[i].searchTerms.length; j++) {
          if (countries[i].searchTerms[j].includes(searchTerm)) {
            found = true
            filteredCountries.push(countries[i])
          }
        }
      }
      setFilteredCountries(filteredCountries)
    }
  }, [searchTerm])

  const openCountryDetails = (id: string) => {
    router.push({
      pathname: "/(tabs)/countries/[id]",
      params: { id },
    });
  }

  return (
    <View style={styles.container}>

      {loading && <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} />
      </View>}

      {!loading && <TextInput style={styles.textInput}
        placeholder="Search"
        value={searchTerm}
        onChangeText={(value) => setSearchTerm(value)} />}

      {!loading && <FlatList
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              openCountryDetails(item.id)
            }}
            style={styles.countryRowContainer}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.flagContainer}>
                <Image source={{ uri: item.flag }} style={styles.flag} />
              </View>
              <View style={styles.infoContainer}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: text.primary }}>{item.name}</Text>
                  <Text>{item.region}</Text>
                </View>
                <Text>from: {item.startingFrom}</Text>
              </View>
            </View>

          </TouchableOpacity>
        )}
        data={searchTerm.length ? filteredCountries : countries}
        style={styles.container}
      />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: background.secondary
  },
  textInput: {
    backgroundColor: 'white',
  },
  flagContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  flag: {
    width: 50,
    height: 40,
    borderRadius: radius.sm,
    marginRight: 4,
    resizeMode: 'cover'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  countryRowContainer: {
    borderColor: border.default,
    borderWidth: 1,
    margin: 4,
    borderRadius: radius.sm,
    padding: 4,
  },
  loaderContainer: {
    height: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: background.primary
  }
});
