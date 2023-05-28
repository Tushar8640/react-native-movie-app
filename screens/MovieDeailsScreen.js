import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MovieDeailsScreen({ route, navigation }) {
  console.log(route);
  const { movie } = route.params;
  console.log(movie);
  const [movieDetails, setMovieDetails] = useState({});

  const uri = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=68c5cc957a47d947db434030caf66951&language=en-US`;

  const getMovies = async () => {
    try {
      const response = await fetch(uri);
      const result = await response.json();

      setMovieDetails(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movieDetails);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      
      }}
    >
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <View>
          <Image
            style={{
              width: "100%",
              height: 250,
              alignItems: "center",
              borderBottomLeftRadius: 20,
              position: "relative",
            }}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`,
            }}
          />
          <View
            style={{
              padding: 20,

              position: "absolute",
              bottom: -30,
              left: 20,
              backgroundColor: "white",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.51,
              shadowRadius: 13.16,

              elevation: 20,
            }}
          >
            <View>
              <Text>8.2/10</Text>
              <Text>5400,43</Text>
            </View>
            <View>
              <Text>Rate This</Text>
            </View>
            <View>
              <Text>Metascore</Text>
              <Text>5400,43 critic reviews</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 30, marginTop: 60 }}>
            {movieDetails?.title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 16,
                marginTop: 10,
                marginRight: 10,
              }}
            >
              {movieDetails?.release_date}
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 16,
                marginTop: 10,
                marginRight: 10,
              }}
            >
              {movieDetails?.runtime}min
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 16,
                marginTop: 10,
                marginRight: 10,
              }}
            >
              {movieDetails?.revenue}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", marginTop: 15, flexWrap: "wrap" }}
          >
            {movieDetails?.genres?.map((g) => (
              <Text
                key={g.id}
                style={{
                  marginRight: 15,
                  borderWidth: 1,
                  borderRadius: 50,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginTop: 10,
                }}
              >
                {g.name}
              </Text>
            ))}
          </View>
          <Text style={{ fontWeight: "500", fontSize: 20, marginTop: 20 }}>
            Ploat Summary
          </Text>

          <Text style={{ fontWeight: "400", fontSize: 16, marginTop: 10 }}>
            {movieDetails?.overview}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
