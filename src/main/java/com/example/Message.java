package com.example;

public class Message {

    private int messageId;
    private String messageText;

    public Message(int messageId, String messageText) {
        this.messageId = messageId;
        this.messageText = messageText;
    }

    public int getMessageId() {
        return messageId;
    }

    public void setMessageId(int messageId) {
        this.messageId = messageId;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }
}
