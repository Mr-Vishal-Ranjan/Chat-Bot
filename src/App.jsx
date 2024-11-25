import React, { useState } from "react";
import { AsideSection } from "./navigation/AsideSection";
import { Loader } from "./Loader";
import { SettingsSection } from "./chat/SettingsSection";
import { MainContent } from "./chat/ChatSection";
import { Sender, useAI } from "./components/useAi";
import { Engine } from "./__helper__/engine-helper";

function App() {
  const [apiKey, setApiKey] = useState("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");
  const [engineId, setEngineId] = useState(Engine.Qwen2_5Instruct);

  const {
    question,
    setQuestion,
    conversationHistory,
    askQuestion,
    aiPersonality,
    setPersonality,
    isLoading,
    resetConversation,
  } = useAI(Sender.AI);

  const [errorMessage, setErrorMessage] = useState(null);

  const [showConversationDebug, setShowConversationDebug] = useState(false);

  function poseQuestion(e) {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    if (question === "") {
      setErrorMessage("Please enter a question!");
      return;
    } else {
      setErrorMessage(null);
    }

    askQuestion(question);
  }

  return (
    <>
      <div className="full h-min-screen">
        <div className="flex row wrap">
          <SettingsSection
            aiPersonality={aiPersonality}
            setPersonality={setPersonality}
            apiKey={apiKey}
            setApiKey={setApiKey}
            resetConversation={resetConversation}
            engineId={engineId}
            setEngineId={setEngineId}
          />
          <section
            id="content"
            className="full md:half lg:screen-v-scroll flex row wrap relative"
          >
            <div className="full md:py px">
              <center>
                <span className="large title white">Chatbot</span>
              </center>
              <br />
              <br />

              <MainContent
                showConversationDebug={showConversationDebug}
                conversationHistory={conversationHistory}
                setShowConversationDebug={setShowConversationDebug}
                loading={isLoading}
                apiKey={apiKey}
                aiName={aiPersonality}
              />
              {conversationHistory.map((item, index) => {
                if (item.sender === Sender.HUMAN) {
                  return (
                    <span key={index} className={"message-text"}>
                      <span>You:</span>{" "}
                      <span className="blue">{item?.text}</span>
                    </span>
                  );
                } else {
                  return (
                    <>
                      <br />
                      <span key={index} className={"message-text"}>
                        <span>{aiPersonality}:</span>{" "}
                        <span
                          className="green"
                          dangerouslySetInnerHTML={{ __html: item?.text }}
                        ></span>
                      </span>
                    </>
                  );
                }
              })}
              {isLoading ? (
                <>
                  <span className={"message-text"}>
                    <span>You:</span> <span className="blue">{question}</span>
                  </span>
                  <div style={{ textAlign: "center" }}>
                    <Loader />
                    <br />
                  </div>
                </>
              ) : (
                <span>
                  <br />
                  <br />
                </span>
              )}

              <form onSubmit={poseQuestion}>
                <input
                  type="text"
                  value={question}
                  placeholder={"Ask a question..."}
                  spellCheck={false}
                  onChange={(e) => setQuestion(e.target.value)}
                  style={{ border: "1px solid #033a" }}
                />
                {errorMessage && (
                  <span className={"fuschia"}>{errorMessage}</span>
                )}
                <button
                  type="submit"
                  className="button"
                  disabled={isLoading}
                ></button>
              </form>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="submit" onClick={poseQuestion}>
                  Submit
                </div>
              </div>
            </div>
          </section>
          <AsideSection
            showConversationDebug={showConversationDebug}
            setShowConversationDebug={setShowConversationDebug}
          />
        </div>
      </div>
      <style jsx>{`
        .submit {
          border: 1px solid #19b5ff;
          padding: 8px 16px;
          border-radius: 40px;
          margin: 0 0 40px 0;
          &:hover {
            cursor: pointer;
            background: #19b5ff;
            color: black;
          }
        }
      `}</style>
    </>
  );
}

export default App;
