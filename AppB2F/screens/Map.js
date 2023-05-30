import { useNavigation } from "@react-navigation/core";
import MapView, { Marker } from "react-native-maps";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Map = () => {
  const navigation = useNavigation();
  const [mapRegion, setMapRegion] = useState({
    latitude: 43.61150028375979,
    longitude: 3.873996852490878,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredButtons, setFilteredButtons] = useState([]);

  const buttons = [
    { label: "Camping", icon: <FontAwesome5 name="campground" size={16} color="black" /> },
    { label: "Toilettes", icon: <FontAwesome5 name="toilet" size={16} color="black" /> },
    { label: "Stand", icon: <Entypo name="shop" size={24} color="black" /> },
  ];

  const goToHome = () => {
    navigation.navigate("Accueil");
  };

  const goToProfil = () => {
    navigation.navigate("Profil");
  };

  const goToCard = () => {
    navigation.navigate("CreditCard");
  };

  const goToFood = () => {
    navigation.navigate("Food");
  };

  useEffect(() => {
    userLocation();
  }, []);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission refusée");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredButtons(buttons);
    } else {
      const filtered = buttons.filter((button) =>
        button.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredButtons(filtered);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={mapRegion} title="Marker" />
        </MapView>
        <View style={styles.rectangle}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un lieu"
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
          <View style={styles.buttonContainer}>
            {filteredButtons.map((button, index) => (
              <TouchableOpacity style={styles.button} key={index}>
                <Text style={styles.buttonText}>{button.label}</Text>
                {button.icon}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconContainer} onPress={goToFood}>
          <FontAwesome5 name="shopping-basket" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialCommunityIcons name="map-marker" size={32} color="#EF8536" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={goToHome}>
          <Ionicons name="home" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={goToCard}>
          <FontAwesome name="credit-card-alt" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={goToProfil}>
          <Ionicons name="person" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    position: "absolute",
    top: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 250,
    position: "relative",
    top: -50,
  },
  rectangle: {
    position: "absolute",
    bottom: -100,
    zIndex: 100,
    width: "100%",
    height: 420,
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f2f2f2",
    zIndex: 200,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 25,
    borderRadius: 20,
    height: 65,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 90,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginRight: 5,
  },
});

export default Map;
