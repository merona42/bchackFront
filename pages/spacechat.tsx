"use client";
import React, { useState } from "react";

const SpaceChatView: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [selectedItem, setSelectedItem] = useState("KB 손해보험");
  const [streamedData, setStreamedData] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [partialChunk, setPartialChunk] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (endpoint: string) => {
    return () => {  // This is a closure to delay the execution
      setLoading(true);
      setStreamedData('');  // Clear previous streamed data
      fetch(`${apiUrl}/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Transfer-Encoding': 'chunked'
        },
        body: JSON.stringify({
          question: question
        })
      })
        .then((response) => {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder('utf-8');
          function read() {
            reader?.read().then(({ done, value }) => {
              if (done) {
                setLoading(false);
                return;
              }

              const decodedValue = decoder.decode(value, { stream: true });
              const fullChunk = partialChunk + decodedValue;

              try {
                const jsonResponse = JSON.parse(fullChunk);

                if (jsonResponse.answer) {
                  const answer = jsonResponse.answer;
                  displayAnswerOneByOne(answer);
                  setPartialChunk('');
                } else {
                  console.warn('answer 키가 JSON 응답에 없습니다:', jsonResponse);
                }
              } catch (error) {
                setPartialChunk(fullChunk);
              }

              read();
            });
          }

          function displayAnswerOneByOne(answer: string) {
            let index = -1;
            function showNextChar() {
              if (index < answer.length - 1) {
                setStreamedData((prev) => prev + answer[index]);
                index++;
                setTimeout(showNextChar, 100);
              }
            }
            showNextChar();
          }

          read();
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error:', error);
        });
    };
  };

  // 콘텐츠 데이터
  const content: { [key: string]: { title: string; description: string; date: string; endpoint: string; } } = {
    "KB 손해보험": {
      title: "KB 손해보험",
      description: `KB 손해보험(KB Insurance)은 대한민국의 대표적인 손해보험사 중 하나로, KB금융그룹의 계열사입니다.
      이 회사는 1959년에 설립되어, 당시 이름은 교직자재해상보험이었습니다. 이후 여러 번의 명칭 변경과 함께
      성장을 거듭해 왔으며, 현재의 KB 손해보험이라는 이름은 2015년에 KB금융그룹에 인수된 후 채택된 것입니다.`,
      date: "LIG화재 보험 2024.08.27 기준입니다.",
      endpoint: "insurance-chat"
    },
    "숭실대학교": {
      title: "숭실대학교",
      description: `이마트는 대한민국의 대표적인 대형마트 브랜드입니다. 이 회사는 다양한 상품을 합리적인 가격에 제공하며,
      전국에 수많은 매장을 운영하고 있습니다.`,
      date: "숭실대학교 정보 2024.08.27 기준입니다.",
      endpoint: "student-chat"
    },
    "인천메트로서비스": {
      title: "인천 메트로서비스",
      description: `인천 메트로서비스는...`,
      date: "인천 메트로서비스 정보 2024.08.27 기준입니다.",
      endpoint: "company-chat",
    },
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "20%", backgroundColor: "#F4F4F4", padding: "20px" }}>
        <div style={{ marginBottom: "20px", fontWeight: "bold" }}>spacechat</div>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {Object.keys(content).map((item) => (
            <li
              key={item}
              style={{
                marginBottom: "10px",
                cursor: "pointer",
                color: selectedItem === item ? "blue" : "black"
              }}
              onClick={() => setSelectedItem(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>{content[selectedItem].title}</h2>
        <p>{content[selectedItem].description}</p>
        <div style={{ marginTop: "20px", fontStyle: "italic" }}>
          {content[selectedItem].date}
        </div>
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {streamedData}
        </pre>
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button style={{ padding: "10px 20px", backgroundColor: "#f4f4f4", border: "1px solid #ccc", borderRadius: "4px" }}>
            {content[selectedItem].title}에 대해서 알려줘
          </button>
          <button style={{ padding: "10px 20px", backgroundColor: "#f4f4f4", border: "1px solid #ccc", borderRadius: "4px" }}>
            {content[selectedItem].title}에게 질문하기
          </button>
        </div>
        <div style={{ marginTop: "20px", display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: "1px solid #ccc", borderRadius: "4px", padding: '10px' }}>
          <input
            type="text"
            value={question}
            onChange={handleInputChange}
            placeholder="Enter your question"
            style={{ border: 'none', flex: 1 }}
          />
          <button onClick={handleSubmit(content[selectedItem].endpoint)} disabled={loading} style={{ marginLeft: '10px' }}>
            Submit
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
        </div>
      </div>
    </div>
  );
};

export default SpaceChatView;