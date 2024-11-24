import React from 'react'

export function MainContent(props) {

    const {
        showConversationDebug, setShowConversationDebug, loading, conversationHistory, aiName, apiKey,
    } = props;

    if (showConversationDebug) {
        return <>
            <div className={'debug-header'}>
                <b>Debug</b>
            </div>
            <pre className={'debug-content'}>
                {JSON.stringify(conversationHistory, null, 2)}
            </pre>
            <hr/>
        </>
    }

    return <center className={'green'}>
        You are talking to <b>{aiName}</b>
        <br/>
        <br/>
    </center>
}
