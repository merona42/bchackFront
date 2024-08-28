

import style from "./main.module.css";
import cx from 'classnames'



export default function Main(){
    const messages = [
        {messageId: 1, roomId: 123, id: 'ai',  content: '국가의 시대에 오신것을 환영합니다!!\n안녕하세요', createdAt: new Date()},
        {messageId: 2, roomId: 123, id: 'me', content: '안녕히가세요.', createdAt: new Date()},
      ]

    return(
        <div className={style.container}>

            <div className={style.containerLeft}>
                <img src="../logo.svg" alt="logo"></img>
                <div className={style.companyMenu}>
                        <li>
                            <img src="/kbimg.png" alt="company"></img>
                            <div>
                                KB 손해보험
                            </div>
                            <img src="/arrow.svg" alt="arrow"></img>
                        </li>
                        <li>
                            <img src="/kbimg.png" alt="company"></img>
                            <div>
                                이마트
                            </div>
                            <img src="/arrow.svg" alt="arrow"></img>
                        </li>
                        <li>
                            <img src="/sungshil.png" alt="company"></img>
                            <div>
                                숭실대학교
                            </div>
                            <img src="/arrow.svg" alt="arrow"></img>
                        </li>
                        <li>
                            <img src="/inha.png" alt="company"></img>
                            <div>
                                인하대학교
                            </div>
                            <img src="/arrow.svg" alt="arrow"></img>
                        </li>
                        <li>
                            <img src="/kwangwoon.png" alt="company"></img>
                            <div>
                                광운대학교
                            </div>
                            <img src="/arrow.svg" alt="arrow"></img>
                        </li>
                </div>

            </div>
            <div className={style.containerRight}>
                <div className={style.rightHeader}>
                    <h3>새로운 대화</h3>
                </div>
                <div className={style.rightBody}>
                    <div className={style.bodyHeader}>
                        <div className={style.bodyHeaderContainer}>
                            <img src="/kbimg.png" alt="company_logo"></img>
                            <div className={style.bodyHeaderContents}>
                                <h3>
                                    KB손해보험
                                </h3>
                                <div>
                                    KB 손해보험(KB Insurance)은 대한민국의 대표적인 손해보험사 중 하나로, KB금융그룹의 계열사입니다. 이 회사는 1959년에 설립되어, 당시 이름은 고려화재해상보험이었습니다. 이후 여러 번의 명칭 변경과 함께 성장을 거듭해 왔으며, 현재의 KB 손해보험이라는 이름은 2015년에 KB금융그룹에 인수된 후 채택된 것입니다.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.notice}>LIG화재 보험 2024.08.27 기준입니다.</div>
                    <div className ={style.chatArea}>
                        {messages.map((m) => {
                            if (m.id !== 'ai') { 
                                return (
                                    <div key={m.messageId}>
                                        <pre
                                        className={cx(style.message, style.myMessage)}>
                                            <div className={style.content}>{m.content}</div>

                                        </pre>
                                    </div>
                                
                                );
                            }
                            return (
                                <div key={m.messageId} >
                                    <div  className={style.aiChatHeader}>
                                        <img src="/kbimg.png" alt="company"></img>
                                        <div>
                                            KB 손해보험
                                        </div>
                                    </div>
                                    
                                    <pre
                                    className={cx(style.message, style.aiMessage)}>
                                        <div className={style.content}>{m.content}</div>
                                    </pre>
                                </div>
                            );
                        })}
                    </div>
                    <div className={style.questionAreaContainer}>
                        <div className={style.questionArea}>
                            <input placeholder="LIG 화재보험에게 질문하기" className={style.questionbox}>
                            
                            </input>
                            <span>
                                <img src="/whiteArrow.svg" alt="whiteArrow"></img>
                            </span>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}