import { AMQPChannel, AMQPWebSocketClient } from "@cloudamqp/amqp-client";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import appconfig from "./appconfig.json";

export default function App() {
  const [ready, setReady] = useState<boolean>(false);
  const [channel, setChannel] = useState<AMQPChannel | null>(null);

  const { cloud_amqp_url, cloud_amqp_user, cloud_amqp_password } = appconfig;

  useEffect(() => {
    setReady(false);
    const client = new AMQPWebSocketClient(
      cloud_amqp_url,
      cloud_amqp_user,
      cloud_amqp_password,
      cloud_amqp_user
    );

    client
      .connect()
      .then((connection) => connection.channel())
      .then((channel) => {
        setChannel(channel);
        setReady(true);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title="Publish"
        onPress={() => {
          if (ready && channel) {
            channel.basicPublish("", "my_queue", "Hello, World!").then(
              () => {
                Alert.alert("Message Sent");
              },
              (error) => {
                Alert.alert("Error sending message", error.message);
              }
            );
          } else {
            Alert.alert("Channel Not ready");
          }
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
