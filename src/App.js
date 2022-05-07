import './App.css';
import {useState, useEffect} from 'react'
import WordsStack from './Components/wordsStack';
import Keyboard from './Components/keyboard';
import words from './words';
import PopUp from './Components/popUp';
import Label from './Components/label';
import Info from './Components/info';
import Clear from './Components/clear';


function App() {
  const emptyWordsArray = [{content: "", submitted: false}, {content: "", submitted: false},{content: "", submitted: false},{content: "", submitted: false},{content: "", submitted: false}, {content: "", submitted: false}]; 
  
  const [wordsArray, setWordsArray] = useState( JSON.parse(window.localStorage.getItem('storedArray')) || emptyWordsArray); 
  const [solution, setSolution]= useState(JSON.parse(window.localStorage.getItem('storedSolution')) || words[Math.floor(Math.random() * words.length)]); 
  const [currentIndex, setCurrentIndex]= useState(JSON.parse(window.localStorage.getItem('storedIndex'))||0);
  const [isRunning, setIsRunning] = useState(wordsArray.map(word=> word.content).filter(w=> w=== solution).length === 0 && currentIndex <=5? true: false); 
  const [enteredLetters, setEnteredLetters] = useState(JSON.parse(window.localStorage.getItem('storedEntries')) || {right: [], semiRight:[], wrong: []}); 
  const [currentStreak, setCurrentStreak] = useState(JSON.parse(window.localStorage.getItem('currentStreak')) || 0);
  const [maxStreak, setMaxStreak] = useState(JSON.parse(window.localStorage.getItem('maxStreak')) || 0);
  const [gamesPlayed, setGamesPlayed] = useState(JSON.parse(window.localStorage.getItem('gamesPlayed')) || 0);
  const [isViewingLabel, setIsViewingLabel] = useState(false);
  const [labelText, setLabelText] = useState(''); 
  const [viewInfo, setViewInfo] = useState(false);
  const [viewClear, setViewClear] = useState(false);


  /// loading state from localStorage after page loads 
  useEffect(()=>{
    if(window.localStorage.getItem('storedArray')){
      setWordsArray(JSON.parse(window.localStorage.getItem('storedArray')).map(storedWord=> storedWord.submitted? storedWord: {content: "", submitted: false})); 
      setSolution(JSON.parse(window.localStorage.getItem('storedSolution'))); 
      setCurrentIndex(JSON.parse(window.localStorage.getItem('storedIndex'))); 
      setIsRunning(JSON.parse(window.localStorage.getItem('storedStatus')));
      setCurrentStreak(JSON.parse(window.localStorage.getItem('currentStreak')));
      setMaxStreak(JSON.parse(window.localStorage.getItem('maxStreak')));
      setGamesPlayed(JSON.parse(window.localStorage.getItem('gamesPlayed')));
    }
  },[]);

  /// syncing state with localStorage
  useEffect(()=>{
    window.localStorage.setItem('storedArray', JSON.stringify(wordsArray)); 
    window.localStorage.setItem('storedSolution', JSON.stringify(solution)); 
    window.localStorage.setItem('storedIndex', JSON.stringify(currentIndex)); 
    window.localStorage.setItem('storedStatus', JSON.stringify(isRunning));
    window.localStorage.setItem('storedEntries', JSON.stringify(enteredLetters));
    window.localStorage.setItem('currentStreak', JSON.stringify(currentStreak));
    window.localStorage.setItem('maxStreak', JSON.stringify(maxStreak));
    window.localStorage.setItem('gamesPlayed', JSON.stringify(gamesPlayed));
  }); 

  /// adding pc keyboard input functionality
useEffect(()=>{
  document.addEventListener('keydown', keypressed)
  return function cleanup(){
    document.removeEventListener('keydown', keypressed)
  }
})

const keypressed = (e)=>{
  e.stopImmediatePropagation();
  if (e.key === 'Enter' || e.key === 'Backspace' || 'qwertyuiopasdfghjklzxcvbnm'.split('').includes(e.key)){
    handleKeyboardClick(e.key.toLowerCase());
  }
}

/// handling state change after a click happens
const handleKeyboardClick = (keyLetter)=> {
  let lastEntry = ''; 
  if (isRunning){
    let currentWordsArray = [...wordsArray]; 
    if (!currentWordsArray[currentIndex].submitted) {
      if (keyLetter === 'enter'){
        // submission
        if (currentWordsArray[currentIndex].content.trim().length < 5){
          ViewLabel('Not Enough Letters' , 2000); 
        } else {
          lastEntry = currentWordsArray[currentIndex].content;
          if(words.includes(lastEntry)){
            currentWordsArray.splice(currentIndex, 1, {content:lastEntry, submitted: true });
            lastEntry.split('').forEach(letter=> letterStateProcess(letter));
            setCurrentIndex(currentIndex +1);
            if(currentIndex>=5 || lastEntry === solution){
              setIsRunning(false); 
            }
            if (lastEntry === solution){
              setCurrentStreak(currentStreak + 1); 
              setMaxStreak(currentStreak +1 > maxStreak? currentStreak + 1: maxStreak); 
              setGamesPlayed(gamesPlayed +1);
              
            }else if (currentIndex>=5){
              setCurrentStreak(0);
              setGamesPlayed(gamesPlayed + 1);
              ViewLabel(solution.toUpperCase(), 20000)
            }

          }else{
            ViewLabel('Invalid Input', 2000);
          }
          
        }
      }else if (keyLetter === 'backspace'){
        // remvoe a letter
          let updatedWord = currentWordsArray[currentIndex].content.trim();
          updatedWord = updatedWord.split('');
          updatedWord.pop();
          updatedWord = updatedWord.join(''); 
          currentWordsArray.splice(currentIndex, 1, {content: updatedWord, submitted: false})
      }else {
        // add letters
        if (currentWordsArray[currentIndex].content.trim().length < 5){
          let updatedWord = currentWordsArray[currentIndex].content.trim();
          updatedWord += keyLetter; 
          currentWordsArray.splice(currentIndex, 1, {content: updatedWord, submitted: false})
        }
      }
    }
    setWordsArray(currentWordsArray);
  }
}


/// keyboard letter State processing
const letterStateProcess = (letter)=>{
  if (!enteredLetters.right.includes(letter)) {
    let currentEnteredLetters = {...enteredLetters};
  if(solution[wordsArray[currentIndex].content.indexOf(letter)] === letter){
    currentEnteredLetters.right.push(letter); 
  }else if (solution.includes(letter)){
    currentEnteredLetters.semiRight.push(letter); 
  }else {
    currentEnteredLetters.wrong.push(letter); 
  }


  /// turning the array into a set will remove repeated letters, then turn it back into a normal array. 
  currentEnteredLetters.right = Array.from(new Set(currentEnteredLetters.right));  
  currentEnteredLetters.semiRight = Array.from(new Set(currentEnteredLetters.semiRight));  
  currentEnteredLetters.wrong = Array.from(new Set(currentEnteredLetters.wrong));  
  setEnteredLetters(currentEnteredLetters); 
  }
}


/// New Wordle 
const handleNewWordle = ()=> {
  setWordsArray(emptyWordsArray);
  setCurrentIndex(0);
  setEnteredLetters({right: [], semiRight:[], wrong: []});
  setSolution(words[Math.floor(Math.random() * words.length)]);
  setIsRunning(true);
  setIsViewingLabel(false); 
}


const ViewLabel =  (text, delay)=> {
  setIsViewingLabel(false); 
  setLabelText(text); 
  setIsViewingLabel(true); 
  setTimeout(()=> setIsViewingLabel(false), delay) // render label for 2 seconds
}

const handleViewInfo = ()=>{setViewInfo(true)}
const handleHideInfo = ()=>{setViewInfo(false)}
const handleHideClear = ()=>{setViewClear(false)}

const Initialize = ()=>{
  setWordsArray(emptyWordsArray);
  setSolution(words[Math.floor(Math.random() * words.length)]);
  setCurrentIndex(0);
  setIsRunning(true);
  setEnteredLetters({right: [], semiRight:[], wrong: []});
  setCurrentStreak(0);
  setGamesPlayed(0); 
  setMaxStreak(0);
  setViewClear(false);
}


  return (
    <div className="App">
      {viewClear && <Clear handleHideClear={handleHideClear} Initialize={Initialize}/>}
      {viewInfo && <Info handleHideInfo={handleHideInfo} />}
      {isViewingLabel && <Label text={labelText}></Label>}
      <PopUp handleNewWordle={handleNewWordle} isRunning={isRunning} currentStreak={currentStreak} maxStreak={maxStreak} gamesPlayed={gamesPlayed} />
      <div className= 'navbar'>
        <img onClick={handleViewInfo} style={{ position: 'absolute', top: '1.5vh', left: '1.5vh' , cursor: 'pointer'}} src={require('./Media/dev-icon.png')} alt='dev-icon'></img>
        <img onClick={()=> setViewClear(true)} style={{ position: 'absolute', top: '1.5vh', right: '1.5vh' , cursor: 'pointer'}} src={require('./Media/bin.png')} alt='clear-data'></img>
        Not Daily Wordle
      </div>
      <WordsStack solution={solution} wordsArray={wordsArray}/>
      <Keyboard handleKeyboardClick={handleKeyboardClick} enteredLetters={enteredLetters}/> 
    </div>
  );
}

export default App;
