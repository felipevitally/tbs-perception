// Substitua o useState simples por uma inicialização com localStorage
const [streak, setStreak] = useState(() => {
  const savedStreak = localStorage.getItem('blindSoundStreak');
  return savedStreak ? parseInt(savedStreak, 10) : 0;
});

// Use um useEffect para atualizar o localStorage sempre que o streak mudar
useEffect(() => {
  localStorage.setItem('blindSoundStreak', streak.toString());
}, [streak]);
