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

            </div>
            <div className={style.containerRight}>
                <div className={style.rightHeader}>

                </div>
                <div className={style.rightBody}>
                    <div className={style.whatisit}>

                    </div>
                    <div className ={style.chatArea}>
                        {messages.map((m) => {
                            if (m.id !== 'ai') { 
                                return (
                                <pre
                                    key={m.messageId}
                                    className={cx(style.message, style.myMessage)}>
                                    <div className={style.content}>{m.content}</div>

                                </pre>
                                );
                            }
                            return (
                                <pre
                                key={m.messageId}
                                className={cx(style.message, style.aiMessage)}>
                                    <div className={style.content}>{m.content}</div>
                                </pre>
                            );
                        })}
                    </div>
                    <div className={style.qustionAreaContainer}>
                        <div className={style.qustionArea}>
                            안녕하세요
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}