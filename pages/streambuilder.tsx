import { useState } from 'react';

function StreamBuilder() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [streamedData, setStreamedData] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [partialChunk, setPartialChunk] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = () => {
    setLoading(true); 
    setStreamedData(''); 
    fetch(`${apiUrl}/api/chat`, {
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
            if (index < answer.length-1) {
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

  return (
    <div>
      <h1>Stream Example</h1>
      {loading && <div>Loading...</div>}
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {streamedData}
      </pre>
      <input 
        type="text" 
        value={question} 
        onChange={handleInputChange} 
        placeholder="Enter your question"
      />
      <button onClick={handleSubmit} disabled={loading}>Submit</button>
    </div>
  );
}

export default StreamBuilder;