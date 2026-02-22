import { LanguageContext } from "@/context/languageContext";
import { getCountries } from "@/lib/api";
import { background, radius } from "@/lib/theme";
import { CountryDetailResponse } from "@/lib/types";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function CountryDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const languageContext = useContext(LanguageContext);
  const [selectedCountry, setSelectedCountry] = useState<any>(null)


  useEffect(() => {
    if (id) {
      getCountries('id=' + id + '&language=' + languageContext?.selectedLanguage + '&currency=' + languageContext?.selectedCurrency)
        .then((result: CountryDetailResponse) => {
          setSelectedCountry(result.data)
        })
    }
  }, [id])

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 12 }}>
        {/* <Image source={{ uri: selectedCountry?.country.flag }} style={{ width: 140, height: 80, borderRadius: radius.md, marginRight: 4, resizeMode: 'cover' }} /> */}
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{selectedCountry?.country.name}</Text>
      </View>

      <FlatList
        style={styles.listContainer}
        data={selectedCountry?.plans}
        ListHeaderComponent={<View>
          <Text style={styles.descriptionContainer}>{selectedCountry?.country.description}</Text>
        </View>}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemTitleContainer}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Text style={{ fontWeight: 'bold' }}>{item.price} <Text>{item.currency}</Text></Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <View style={styles.chip}>
                <Text>{item.networkSpeed}</Text>
              </View>
              <View style={styles.chip}>
                <Text>{!item.hasPhoneNumber && <Text>No</Text>} Phone number</Text>
              </View>
              {item.isTetheringAllowed && <View style={styles.chip}>
                <Text>Tethering</Text>
              </View>}
            </View>
            <View style={styles.carriersContainer}>
              <Text style={{ fontWeight: 'bold' }}>Carriers: </Text>
              {item.carriers.map((c: string, index: number) => (
                <Text key={index}>- {c}</Text>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    marginBottom: 74,
    backgroundColor: background.secondary
  },
  descriptionContainer: {
    marginBottom: 14,
  },
  listContainer: {
    marginBottom: 20
  },
  itemContainer: {
    borderWidth: 1,
    borderRadius: radius.sm,
    marginBottom: 4,
    padding: 4
  },
  itemTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  carriersContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  chip: {
    backgroundColor: background.info,
    marginRight: 6,
    marginTop: 6,
    borderRadius: radius.md,
    paddingHorizontal: 8,
    paddingVertical: 4
  }
});
