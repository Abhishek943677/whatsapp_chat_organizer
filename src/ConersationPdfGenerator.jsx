import React, { useEffect, useState } from "react";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";

const ConversationPDFGenerator = () => {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(fileName);
  }, []);

  const handleFileChange = (event) => {
    setFileContent("");
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{margin:"auto", display:"flex", flexDirection:"column" , justifyItems:"center", alignItems:"center"}}>
      <h1>whatsapp Conversation into organized pdf</h1>
      <div style={{ height: 50 }}></div>
      <input type="file" accept=".txt" onChange={handleFileChange}/>
      {fileContent && (
        <PDFDownloadLink
          document={<PDFDocument fileContent={fileContent} />}
          fileName={fileName.replace(".txt", ".pdf")}
        >
          {({ loading }) => {
            return <div style={{marginTop : 25}}>{loading ? "Generating PDF..." : "Download PDF"}</div>;
          }}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default ConversationPDFGenerator;
