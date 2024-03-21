import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 15,
  },
  S_dateAndTime: {
    fontSize: 8,
    marginBottom: 5,
    textAlign: "right", // Align date and time to the right
  },
  R_dateAndTime: {
    fontSize: 8,
    marginBottom: 5,
    textAlign: "left", // Align date and time to the right
  },
  R_message: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left", // Align message to the right
  },
 S_message: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "right", // Align message to the right
  },
});

// function to make every msg object
function extractMessages(lines) {
  const messages = [];

  for (const line of lines) {
    const parts = line.split(" - ");
    const dateTime = parts[0];
    if (parts.length >= 2) {
      // Check if there are at least two parts
      const senderAndMessage = parts[1].split(": ");
      const sender = senderAndMessage[0];
      const message = senderAndMessage.slice(1).join(": "); // Rejoin the message parts in case message contains ':'
      messages.push({ dateTime, sender, message });
    }
  }
  return messages;
}

const PDFDocument = ({ fileContent }) => {
  const messages = fileContent.split("\n");
  const msglist = extractMessages(messages);
  
  const name =msglist[1].sender

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        { msglist.map((msg, index) => (
          <React.Fragment key={index}>
            {msg.sender === name ? (
              <>
                <Text style={styles.S_dateAndTime}>{msg.dateTime}</Text>
                <Text style={styles.S_message}>
                  {`${msg.sender}: ${msg.message}`}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.R_dateAndTime}>{msg.dateTime}</Text>
                <Text style={styles.R_message}>
                  {`${msg.sender}: ${msg.message}`}
                </Text>
              </>
            )}
          </React.Fragment>
        ))}
      </Page>
    </Document>
  );
};

export default PDFDocument;
