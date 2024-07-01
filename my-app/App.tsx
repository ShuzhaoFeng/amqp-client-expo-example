import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import TextEncodingPolyfill from "text-encoding";
import { StatusBar } from "expo-status-bar";
import { AMQPChannel, AMQPWebSocketClient } from "@cloudamqp/amqp-client";

import credentials from "./credentials.json";

export default function App() {
  const [ready, setReady] = useState<boolean>(false);
  const [channel, setChannel] = useState<AMQPChannel | null>(null);

  Object.assign(global, {
    TextEncoder: TextEncodingPolyfill.TextEncoder,
    TextDecoder: TextEncodingPolyfill.TextDecoder,
  });

  const {
    amqp_client_url,
    amqp_client_vhost,
    amqp_client_user,
    amqp_client_password,
  } = credentials;

  useEffect(() => {
    setReady(false);
    const client = new AMQPWebSocketClient(
      amqp_client_url,
      amqp_client_vhost,
      amqp_client_user,
      amqp_client_password
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
