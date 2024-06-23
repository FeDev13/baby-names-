"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useGoHome } from "@/hooks/useGoHome";

interface Message {
  _id: string;
  text: string;
  createdAt: string;
}

async function postMessage(text: string): Promise<Message> {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al postear el mensaje");
  }

  return res.json();
}

export default function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const goHome = useGoHome();

  const handlePostMessage = async () => {
    if (!newMessage.trim()) {
      toast.error("El mensaje no puede estar vacío");
      return;
    }

    try {
      const postedMessage = await postMessage(newMessage);
      setMessages([postedMessage, ...messages]);
      setNewMessage("");
      toast.success("Mensaje enviado!");
    } catch (error) {
      toast.error("No se pudo enviar el mensaje");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 text-center">
      <p>Deja tu mensaje para que los padres y el pequeño padawan lo vean en el futuro</p>
      <div className="mb-4 flex flex-col space-y-2">
        <textarea
          className="w-full p-2 border rounded text-black"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Deja tu mensaje..."
        />
        <button
          className="p-2 text-black rounded-md"
          onClick={handlePostMessage}
        >
          Enviar mensaje
        </button>
      </div>
      <button className='rounded-md p-4 text-black  'onClick={goHome}>Regresar</button>
    </div>
  );
}
