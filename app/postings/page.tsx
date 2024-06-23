"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../../styles/global.css";
import { useGoHome } from "../../hooks/useGoHome";

interface Message {
  _id: string;
  text: string;
  createdAt: string;
}

async function fetchMessages(): Promise<Message[]> {
  const res = await fetch("/api/messages");
  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }
  return await res.json();
}

export default function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const goHome = useGoHome();

  useEffect(() => {
    async function loadMessages() {
      try {
        const fetchedMessages = await fetchMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        toast.error("error al cargar los mensajes");
      } finally {
        setLoading(false);
      }
    }
    loadMessages();
  }, []);
  return (
    <div className=" text-center">
      <h2 className="text-3xl font-bold text-center mt-4">Muro de mensajes</h2>
      <button
        className="rounded-md p-4 text-black mx-auto my-8"
        onClick={goHome}
      >
        Regresar
      </button>
      {loading ? (
        <div>Cargando mensajes...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {messages.map((message) => (
            <div
              key={message._id}
              id="card"
              className="rounded-xl w-full p-4 border"
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
