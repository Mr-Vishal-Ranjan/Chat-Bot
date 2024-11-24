import { useState, useEffect } from "react";

export const Sender = {
  HUMAN: "Human",
  AI: "Helpful AI",
};

export const SenderList = [Sender.AI];

export const useAI = (initialPersonality) => {
  const [aiPersonality, setAiPersonality] = useState(initialPersonality);
  const [conversation, setConversation] = useState(initConversation());
  const [conversationHistory, setConversationHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setConversation(initConversation());
    setConversationHistory([]);
  }, [aiPersonality]);

  const getResponse = async () => {
    setIsLoading(true);
    try {
      const prompt =
        conversation + `\n${Sender.HUMAN}: ` + question + `\nHelpful AI: `;

      const response = await fetch(
        "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + "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",
          },
          body: JSON.stringify({
            model: "Qwen/Qwen2.5-72B-Instruct",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 0.7,
          }),
        }
      );
      if (response?.status == 200) {
        const data = await response.json();
        console.log(data);

        const text = data.choices[0]?.message?.content;

        if (text && text.length > 0) {
          setConversation(prompt + text);
          setConversationHistory([
            ...conversationHistory,
            { sender: Sender.HUMAN, text: question },
            { sender: aiPersonality, text: text },
          ]);
          setQuestion("");
        }
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  function initConversation() {
    switch (aiPersonality) {
      case Sender.AI:
        return (
          "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly" +
          "The assistant is deeply interested in helping people. " +
          "The assistant enjoys playing games and telling jokes to pass the time. " +
          "Return output in html format and not include html and body tag"
        );
      default:
        return "This is a conversation with Helpful Ai";
    }
  }

  const askQuestion = (question) => {
    setQuestion(question);
    if (!isLoading) {
      getResponse();
    }
  };

  const setPersonality = (personality) => {
    setAiPersonality(personality);
  };

  const resetConversation = () => {
    setConversation(initConversation());
    setConversationHistory([]);
  };

  return {
    question,
    setQuestion,
    conversationHistory,
    askQuestion,
    aiPersonality,
    setPersonality,
    isLoading,
    resetConversation,
  };
};
