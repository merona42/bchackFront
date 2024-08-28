import { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div style={styles.container}>
      <img src="/images/top.svg" alt="Top Logo" style={styles.topLogo} width={200} height={200} />
      <img src="/images/bottom.svg" alt="Bottom Logo" style={styles.bottomLogo} width={225} height={200} />
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    color: '#FFF',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  topLogo: {
    animation: 'slideDown 2s ease-out forwards',
    marginBottom: '20px', // 간격 조정
  },
  bottomLogo: {
    animation: 'slideUp 2s ease-out forwards',
    marginTop: '20px', // 간격 조정
  },
};

// CSS 애니메이션 추가
const globalStyles = `
@keyframes slideDown {
  from {
    transform: translateY(0%);
    opacity: 0;
  }
  to {
    transform: translateY(50%);
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(0%);
    opacity: 0;
  }
  to {
    transform: translateY(-60%);
    opacity: 1;
  }
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = globalStyles;
  document.head.appendChild(styleSheet);
}

export default SplashScreen;