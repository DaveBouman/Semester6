import { useEffect, useState } from "react";

type Message = {
  id: string;
  uuid: string;
  content: string;
};

const TimeLine = () => {
  const [messages, setMessages] = useState<Message>([] as unknown as Message);

  useEffect(() => {
    fetch("http://localhost/api/v1/messages/messages", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed!");
      })
      .then((resObject) => {
        setMessages(resObject.entity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {messages?.map((message: Message) => {
        <div>{message.content}</div>;
      })}
      <div>{messages[0].content}</div>
      <div>test</div>
    </>
  );
};

export default TimeLine;
