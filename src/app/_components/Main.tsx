"use client";
import React, { useEffect, useRef,useState } from 'react';
import style from "./main.module.css";
import cx from 'classnames'

export default function Main(){
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [selectedItem, setSelectedItem] = useState("KB 손해보험");
    const [streamedData, setStreamedData] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [partialChunk, setPartialChunk] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState([
        {messageId: 1, roomId: 123, id: 'ai',  content: 'SpaceChat 오신것을 환영합니다!! 안녕하세요', createdAt: new Date()},]);
    

  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        handleSubmit(content[selectedItem].endpoint)(); // 엔터키가 눌리면 handleSubmit 실행
    }
};

  const handleSubmit = (endpoint: string) => {
    return () => {  
      setLoading(true);
      setStreamedData('');
      setQuestion('');
      setMessages((prevMessages) => [
        ...prevMessages,
        {
            messageId: prevMessages.length + 1,
            roomId: 123,
            id: 'me',
            content: question,
            createdAt: new Date(),
        },
    ]);  
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
                    {/* 채팅창에 질문을 추가 */}

                  {/* 채팅창에 대답을 추가 */}
                  setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        messageId: prevMessages.length + 1,
                        roomId: 123,
                        id: 'ai',
                        content: answer,
                        createdAt: new Date(),
                    },
                ]);
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

      const content: { [key: string]: { title: string; description: string; date: string; img: string; endpoint: string; } } = {
        "KB 손해보험": {
          title: "KB 손해보험",
          description: `KB 손해보험(KB Insurance)은 대한민국의 대표적인 손해보험사 중 하나로, KB금융그룹의 계열사입니다.
          이 회사는 1959년에 설립되어, 당시 이름은 교직자재해상보험이었습니다. 이후 여러 번의 명칭 변경과 함께
          성장을 거듭해 왔으며, 현재의 KB 손해보험이라는 이름은 2015년에 KB금융그룹에 인수된 후 채택된 것입니다.`,
          date: "KB 손해보험 2024.08.27 기준입니다.",
          img: "kbimg.png",
          endpoint: "insurance-chat"
        },
        "숭실대학교": {
          title: "숭실대학교",
          description: `숭실대학교는 1897년에 설립된 대한민국의 사립 대학교로, 서울특별시 동작구 상도동에 위치해 있습니다. 숭실대학교는 한국 최초의 근대적 대학으로, 1900년에 우리나라 최초의 근대식 대학부를 설립한 바 있습니다. 학교의 설립 이념은 ‘진리와 봉사’로, 기독교 정신에 바탕을 두고 전인적 교육을 실현하며 사회에 기여할 수 있는 인재를 양성하는 것을 목표로 합니다..`,
          date: "숭실대학교 정보 2024.08.27 기준입니다.",
          img: "sungshil.svg",
          endpoint: "student-chat"
        },
        "인천메트로서비스": {
          title: "인천 메트로서비스",
          description: `인천메트로서비스(주)는 인천교통공사와 함께 인천도시철도 1호선, 서울도시철도 7호선(인천,부천구간), 월미바다열차의 역사운영과 청소, 시설관리 서비스를 제공하는 기업입니다.`,
          date: "인천 메트로서비스 정보 2024.08.27 기준입니다.",
          img: "incheon.svg",
          endpoint: "company-chat",
        },
      };

    return(
        <div className={style.container}>

            <div className={style.containerLeft}>
                <img src="../logo.svg" alt="logo"></img>
                <div className={style.companyMenu}>
                        <ul style={{ listStyleType: "none", paddingLeft: 0}}>
                            {Object.keys(content).map((item) => (
                                <li
                                     key={item}
                                        style={{
                                        marginBottom: "10px",
                                        cursor: "pointer",
                                        color: selectedItem === item ? "blue" : "black"
                                        }}
                                    onClick={() => {
                                        setMessages([{messageId: 1, roomId: 123, id: 'ai',  content: 'SpaceChat 오신것을 환영합니다!! 안녕하세요', createdAt: new Date()},]);
                                        setSelectedItem(item);
                                    }}
                                >
                                <img src= {content[item].img} alt="company"></img>
                                <div style={{paddingRight : 40}}>
                                    {item}
                                </div>
                                <img src="/arrow.svg" alt="arrow"></img>
                            </li>))}
                            </ul>
                        </div>

            </div>
            <div className={style.containerRight}>
                <div className={style.rightHeader}>
                    <h3>새로운 대화</h3>
                </div>
                <div className={style.rightBody}>
                    <div className={style.bodyHeader}>
                        <div className={style.bodyHeaderContainer}>
                            <img src={content[selectedItem].img} alt="company_logo"></img>
                            <div className={style.bodyHeaderContents}>
                                <h3>
                                {content[selectedItem].title}
                                </h3>
                                <div>
                                {content[selectedItem].description}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.notice}>{content[selectedItem].date}</div>
                    <div className={style.chatArea}>
                        {messages.map((m) => {
                            if (m.id !== 'ai') {
                                return (
                                    <div key={m.messageId}>
                                        <pre className={cx(style.message, style.myMessage)}>
                                            <div className={style.content}>{m.content}</div>
                                        </pre>
                                    </div>
                                );
                            }
                            return (
                                <div key={m.messageId}>
                                    <div className={style.aiChatHeader}>
                                        <img src={content[selectedItem].img} alt="company"></img>
                                        <div>{content[selectedItem].title}</div>

                                    </div>
                                    <div className={cx(style.message, style.aiMessage)}>
                                    <div className={style.content}>{m.content}</div>
                                    </div>
                                    
                                </div>
                            );
                        })}
                        {messages.map((m) => (
                            <div key={m.messageId} className={m.id === 'ai' ? style.aiMessage : style.myMessage}>
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div> {/* 스크롤 위치를 맞출 요소 */}
                    </div>
                    <div className={style.questionAreaContainer}>
                        <div className={style.questionArea}>
                        <input 
                            onKeyDown={handleKeyPress}
                            placeholder={`${content[selectedItem].title}에게 질문하기`} 
                            className={style.questionbox} 
                            value={question} 
                            onChange={handleInputChange}
                        />
                         <span onClick={
                            handleSubmit(content[selectedItem].endpoint)
                        }
                            > {/* 클릭 시 handleSubmit 함수 실행 */}
                            <img src="/whiteArrow.svg" alt="whiteArrow" />
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}