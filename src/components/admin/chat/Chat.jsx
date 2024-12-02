import { useState } from "react";

const ChatComponent = () => {
  // Simulación de mensajes iniciales
  const [messages, setMessages] = useState([
    {
      idCliente: 1,
      idEmpleado: 0,
      message: "Hola, ¿en qué puedo ayudarte?",
      send: "2024-12-02 12:30:00",
      view: true,
    },
    {
      idCliente: 0,
      idEmpleado: 1,
      message: "Quiero saber el estado de mi pedido.",
      send: "2024-12-02 12:31:00",
      view: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  // Manejar envío de mensajes
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      idCliente: 0, // Representa al cliente en este caso
      idEmpleado: 1, // Cambia según el contexto
      message: newMessage,
      send: new Date().toISOString(),
      view: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 shadow-md rounded-lg p-4">
      {/* Encabezado del chat */}
      <div className="text-xl font-bold text-center mb-4">Chat</div>

      {/* Lista de mensajes */}
      <div className="h-80 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              msg.idCliente === 0 ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-white ${
                msg.idCliente === 0 ? "bg-green-500" : "bg-green-500"
              }`}
            >
              <p>{msg.message}</p>
              <span className="text-xs text-gray-200 block mt-1">
                {new Date(msg.send).toLocaleTimeString()} {msg.view && "✓"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Entrada de mensaje */}
      <div className="flex items-center">
        <input
          type="text"
          className="flex-grow border rounded-l-lg p-2"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
