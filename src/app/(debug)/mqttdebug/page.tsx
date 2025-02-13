"use client";

import { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function MqttComponent() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const topic = "big7983/test";

  useEffect(() => {
    // เชื่อมต่อกับ HiveMQ Broker
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
      clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
      username: "", // Public Broker ไม่ต้องใช้
      password: "", // Public Broker ไม่ต้องใช้
      reconnectPeriod: 1000, // Reconnect ทุก 1 วินาที
    });

    client.on("connect", () => {
      console.log("✅ Connected to MQTT Broker");
      client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`✅ Subscribed to topic: ${topic}`);
        } else {
          console.error("❌ Subscription error:", err);
        }
      });
    });

    client.on("message", (receivedTopic, payload) => {
      if (receivedTopic === topic) {
        setMessages((prev) => [...prev, payload.toString()]);
      }
    });

    client.on("error", (err) => {
      console.error("❌ MQTT Connection Error:", err);
    });

    return () => {
      client.end();
    };
  }, []);

  const sendMessage = () => {
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    client.on("connect", () => {
      client.publish(topic, message, {}, (err) => {
        if (!err) {
          console.log("✅ Message sent:", message);
          setMessage("");
        } else {
          console.error("❌ Publish error:", err);
        }
        client.end(); // ปิดการเชื่อมต่อเมื่อส่งเสร็จ
      });
    });
  };

  return (
    <div>
      <h1>MQTT Messages</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        className="bg-slate-300"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
