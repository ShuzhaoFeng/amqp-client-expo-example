import { AMQPChannel, AMQPWebSocketClient } from "@cloudamqp/amqp-client";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

global.TextEncoder = require("text-encoding").TextEncoder;

export default function App() {
  const cloud_amqp_url = "wss://rabbit-01.lmq.cloudamqp.com";

  const [ready, setReady] = useState(false);
  const [channel, setChannel] = useState<AMQPChannel | null>(null);

  useEffect(() => {
    setReady(false);
    const client = new AMQPWebSocketClient(
      cloud_amqp_url,
      "vhost",
      "password",
      "user"
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
            channel.basicPublish("", "my_queue", "Hello, World!");
          } else {
            console.warn("Channel Not ready");
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
