// app/(tabs)/profile.tsx

import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

interface Package {
  id: number;
  name: string;
  price: number;
  duration: string;
  data: string;
  details: string[];
  categories: string;
  created_at: string;
  updated_at: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState<string | null>(
    "https://i.ibb.co.com/FVq6TBn/Whats-App-Image-2024-11-18-at-20-12-39-8bd9b2ae.jpg" // URL gambar default
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("085747056082");
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("Wisz");
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>(
    "radityawisnu@gmail.com"
  );

  const [loading, setLoading] = useState<boolean>(false);

  // Fungsi untuk memilih dan mengunggah gambar
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Izin Ditolak",
          "Kami memerlukan izin untuk mengakses galeri."
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7, // Kompresi gambar
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const imageUri = asset.uri;

        console.log("Selected Image URI:", imageUri);

        // Simpan gambar yang dipilih secara lokal
        setProfilePic(imageUri);
        Alert.alert("Sukses", "Foto profil berhasil diperbarui.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Gagal memilih atau mengunggah gambar.");
    }
  };

  const handleEditPhone = () => {
    if (isEditingPhone) {
      const phoneRegex = /^08\d{8,11}$/;
      if (!phoneRegex.test(phoneNumber)) {
        Alert.alert(
          "Error",
          "Nomor telepon tidak valid. Harus dimulai dengan '08' dan terdiri dari 10-13 digit."
        );
        return;
      }

      // Simulasi penyimpanan data
      Alert.alert("Sukses", "Nomor telepon berhasil diperbarui.");
      setIsEditingPhone(false);
    } else {
      setIsEditingPhone(true);
    }
  };

  const handleEditUsername = () => {
    if (isEditingUsername) {
      if (username.trim().length < 3) {
        Alert.alert("Error", "Username harus terdiri dari minimal 3 karakter.");
        return;
      }

      // Simulasi penyimpanan data
      Alert.alert("Sukses", "Username berhasil diperbarui.");
      setIsEditingUsername(false);
    } else {
      setIsEditingUsername(true);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1a1a1a" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Ganti LinearGradient dengan View dan tambahkan backgroundColor */}
        <View style={styles.solidBackground}>
          <Text style={styles.profileTitle}>Profil Pengguna</Text>
          <TouchableOpacity
            onPress={pickImage}
            style={styles.profilePicContainer}
          >
            <Image
              style={styles.profilePic}
              source={
                profilePic
                  ? { uri: profilePic }
                  : require("../../assets/images/default-profile-pic.png")
              }
              onError={(error) =>
                console.log("Image Load Error:", error.nativeEvent.error)
              }
              onLoad={() => console.log("Image Loaded Successfully")}
            />
          </TouchableOpacity>

          <View style={styles.combinedContainer}>
            <View style={styles.divider} />

            <View style={styles.infoContainer}>
              <Text style={styles.labelRed}>Nama Pengguna</Text>
              {isEditingUsername ? (
                <TextInput
                  style={styles.infoInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Masukkan nama pengguna"
                />
              ) : (
                <Text style={styles.info}>{username}</Text>
              )}
              <TouchableOpacity onPress={handleEditUsername}>
                <Text style={styles.editLinkGray}>
                  {isEditingUsername ? "Simpan" : "Edit"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoContainer}>
              <Text style={styles.labelRed}>Nomor HP</Text>
              {isEditingPhone ? (
                <TextInput
                  style={styles.infoInput}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  placeholder="08xxx"
                />
              ) : (
                <Text style={styles.info}>{phoneNumber}</Text>
              )}
              <TouchableOpacity onPress={handleEditPhone}>
                <Text style={styles.editLinkGray}>
                  {isEditingPhone ? "Simpan" : "Edit"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={[styles.infoContainer, styles.bottomRounded]}>
              <Text style={styles.labelRed}>Email</Text>
              <Text style={styles.info}>{emailAddress}</Text>
            </View>
          </View>

          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Bingung saat menggunakan aplikasi?
            </Text>
            <Text style={styles.helpLink}>Baca selengkapnya disini!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1e1e1e", // Ubah backgroundSafeArea menjadi warna solid
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  // Tambahkan gaya untuk latar belakang solid
  solidBackground: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#1e1e1e", // Warna solid yang diinginkan
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    marginTop: 30,
    marginBottom: 20,
  },
  profilePicContainer: {
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
  },
  combinedContainer: {
    width: "100%",
    backgroundColor: "#3a3a3a",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  infoContainer: {
    padding: 15,
  },
  topRounded: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomRounded: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#1a1a1a",
  },
  labelRed: {
    fontSize: 12,
    color: "#9e9e9e",
    marginBottom: 5,
    fontWeight: "600",
  },
  info: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
  infoInput: {
    fontSize: 16,

    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
    marginBottom: 5,
  },
  subInfo: {
    fontSize: 13,
    color: "#888",
  },
  editLinkGray: {
    fontSize: 12,
    color: "#888",
    marginTop: 1,

    textDecorationLine: "underline",
  },
  helpContainer: {
    width: "100%",
    backgroundColor: "#3a3a3a",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  helpText: {
    fontSize: 14,
    fontFamily: "popins-semibold",
    color: "#fff",
  },
  helpLink: {
    fontSize: 13,
    color: "#9e9e9e",
    marginTop: 5,
    fontFamily: "popins-semibold",
    textDecorationLine: "underline",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
