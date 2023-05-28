import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  const url =
    "https://api.themoviedb.org/3/trending/movie/day?api_key=68c5cc957a47d947db434030caf66951";

  const getMovies = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();

      setMovies(result?.results);
    } catch (error) {
      console.error(error);
    }
  };
  const getGenre = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=68c5cc957a47d947db434030caf66951&language=en-US"
      );
      const result = await response.json();
      setGenre(result?.genres);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovies();
    getGenre();
  }, []);
  const category = [
    {
      id: 1,
      title: "In Theater",
    },
    {
      id: 2,
      title: "Trending",
    },
    {
      id: 3,
      title: "Upcoming",
    },
    {
      id: 4,
      title: "IMdb",
    },
    {
      id: 5,
      title: "Top 10",
    },
    {
      id: 6,
      title: "Latest",
    },
  ];
  const [activeC, setActiveC] = useState("In Theater");
  const [activeG, setActiveG] = useState("Action");

  return (
    <SafeAreaView style={style.container}>
      <View style={style.iconBOx}>
        <Ionicons name="md-menu" size={24} color="black" />

        <Ionicons name="search" size={24} color="black" />
      </View>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text> Login page</Text>
      </Pressable>
      <ScrollView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={style.categoryBox}
        >
          {category?.map((c) => (
            <TouchableOpacity key={c.id} onPress={() => setActiveC(c.title)}>
              <Text
                style={[
                  {
                    fontSize: 20,
                    fontWeight: "bold",
                    marginRight: 20,
                    borderBottomWidth: 2,
                    borderBottomColor: "white",
                  },
                  activeC == c.title && {
                    borderBottomColor: "red",
                    paddingBottom: 4,
                  },
                ]}
              >
                {c.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={style.genreBox}
        >
          {genre?.map((g) => (
            <TouchableOpacity key={g.id} onPress={() => setActiveG(g.name)}>
              <Text
                style={[
                  {
                    fontSize: 20,
                    marginRight: 20,
                    borderWidth: 1,
                    borderColor: "black",
                    padding: 2,
                    borderRadius: 5,
                  },
                  activeG == g.name && {
                    backgroundColor: "black",
                    color: "white",
                  },
                ]}
              >
                {g.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          {movies?.map((m) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("MovieDetails", { movie: m })}
              activeOpacity={0.8}
              style={{ width: 150, marginVertical: 10 }}
              key={m.id}
            >
              <Image
                style={{ width: 160, height: 250, borderRadius: 10 }}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  iconBOx: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    padding: 10,
  },
  categoryBox: {
    flex: 1,
    padding: 10,
    flexWrap: "nowrap",
    alignSelf: "flex-start",
  },
  genreBox: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    flexWrap: "nowrap",
  },
  cardBox: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    padding: 10,
  },
  singleCardBox: {
    padding: 10,
    backgroundColor: "red",

    margin: 10,
  },
});
