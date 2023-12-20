let score = 0;
let wickets = 0;
let resultBalls = [];
let totalBalls = 0; 
let inpRef = React.createRef();
let hit = 0;

function addScore(num) {
  if (wickets < 10) {
     hit = num;
     rendering.render(<App />);
  } 
}

function addWickets() {
  if (wickets <= 10) {
    hit = "W";

     if (wickets === 9) {
       wickets = <span>10</span>;
    }

    rendering.render(<App />);
  }
}

const ButtonsHandle = () => {
  return (
    <div className="mgb">
      <button onClick={() => addScore(0)}>0</button>
      <button onClick={() => addScore(1)}>1</button>
      <button onClick={() => addScore(2)}>2</button>
      <button onClick={() => addScore(3)}>3</button>
      <button onClick={() => addScore(4)}>4</button>
      <button onClick={() => addScore(6)}>6</button>
      <button className="wickets" onClick={addWickets}>
        wicket
      </button>
    </div>
  );
};

function DisplayScore() {
  return (
    <>
      
      <h2>Score Keeper App</h2>
      <p>Score : {score} / {wickets}</p>
      <p>Overs : <Overs/></p> 
     
      </>
  );
}

let Result = () => {
  return (
    <div>
      {resultBalls.map((x, index) => (
        <React.Fragment key={index}>
          {index % 6 === 0 ? <br /> : null}
          <button className="showBorder" key={index}>
            {x} &nbsp;&nbsp;
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

function handleSubmit(e) {
  e.preventDefault(e);

  if (hit === "W") {
    if (wickets <= 10) {
      wickets += 1;
      totalBalls += 1;
    }
  } else {
    if (wickets <= 10) {
      score += hit;
      totalBalls += 1;
    }
  }
  let ballElement;

  if (hit === 'W') {
    ballElement = <span className="wickets">W</span>;
  } else if (hit === 6) {
    ballElement = <span className="six">6 </span>;
  }else if(hit===0){
    ballElement = <strong>dot</strong>;
  
  } else {
    ballElement = <span>{hit}</span>;
  }

  if (wickets <= 10) {
    resultBalls.push(
      <React.Fragment key={resultBalls.length + 1}>
        {ballElement}
        <span className="msg">  {inpRef.current.value}</span>
      </React.Fragment>
    );
  }
  hit = 0;
  inpRef.current.value = "";

  rendering.render(<App />);
}

const Form = () => {
  return (
    <div id="form">
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={hit} />
        <input type="text" ref={inpRef} placeholder="add a comment here" id="" />
        <button className="Sbtn">Add</button>
      </form>
    </div>
  );
};

const Overs = () => {
  const overs = Math.floor(totalBalls / 6);
  const balls = totalBalls % 6;

  return (
    <>
      <span>{overs}.{balls}</span>
    </>
  );
};

const GameOverMsg = ()=>{
   return (<div className="GameOverMsg">
     <marquee className="gameOver">Game Over</marquee>
     <form>
       <button className="restart">Try Again</button>
      </form>   
   </div>)
}


let isModeChange = false;
const Mode = ()=>{
   isModeChange = !isModeChange;
   UpdateMode(); 
}

const ThemeMode =()=>{
  return(<>
  <div id="ball" onClick={Mode}>Dark</div>
  </>)
}

const UpdateMode = ()=>{
    const ball = document.getElementById('ball');
    const body = document.body;

    if(isModeChange){
      ball.textContent = 'Light';
      body.style.backgroundColor = '#111';
      body.style.color = '#fff';
      ball.style.backgroundColor = '#fff'; 
      ball.style.color = '#111'; 
    }else{
      ball.textContent = 'Dark';
      body.style.backgroundColor = '#fff ';
      body.style.color = '#111';
      ball.style.backgroundColor = '#111';
      ball.style.color = '#fff';
    }

}


const BeforeGameOver = ()=>{
  return (<>
      <DisplayScore />
      <ButtonsHandle />
      <Form />
      <hr />
      <Result />
  
  </>)
}

const AfterGameOver = ()=>{
  return (<div className="divResult">
      
      {wickets <=10 ? null : <GameOverMsg/>}
      <hr/>
      <h3>{wickets <= 10 ? null : <h3>Target is : {score + 1}/{wickets}</h3>}</h3>
      <h3>Your Result</h3>
      <Result />
     
  </div>)
}

const App = () => {
  return (
    <>

    <ThemeMode/>
    {/* <BeforeGameOver/> 
    <AfterGameOver/>  */}
     {wickets <=10 ? <BeforeGameOver/> :<AfterGameOver/> }
    
    </>
  );
};




let rendering = ReactDOM.createRoot(document.getElementById("root"));
rendering.render(<App />);

