
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
  if (wickets < 10) {
    hit = "W";
    if (wickets === 9) {

      wickets = <span>Over</span>;
    }
    rendering.render(<App />);
  }
}

const ButtonsHandle = () => {
  return (
    <>
      <button onClick={() => addScore(0)}>0</button>
      <button onClick={() => addScore(1)}>1</button>
      <button onClick={() => addScore(2)}>2</button>
      <button onClick={() => addScore(3)}>3</button>
      <button onClick={() => addScore(4)}>4</button>
      <button onClick={() => addScore(6)}>6</button>
      <button className="wickets" onClick={addWickets}>
        wicket
      </button>
    </>
  );
};

function DisplayScore() {
  return (
    <>
      <h2>Score Keeper App</h2>
      <p>Score : {score} / {wickets}</p>
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
  e.preventDefault();

  if (hit === "W") {
    if (wickets <= 10) {
      wickets += 1;
      totalBalls += 1;
    }
  } else {
    if (wickets < 10) {
      score += hit;
      totalBalls += 1;
    }
  }
  let ballElement;

  if (hit === 'W') {
    ballElement = <span className="wickets">W</span>;
  } else if (hit === 6) {
    ballElement = <span className="six">6 </span>;
  } else {
    ballElement = <span>{hit}</span>;
  }

  if (wickets <= 10) {
    resultBalls.unshift(
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

const App = () => {
  return (
    <>
      <DisplayScore />
      <ButtonsHandle />
      <Form />
      <hr />
      <h3>{wickets <= 10 ? null : <h3>Target is : {score + 1}/<Overs /></h3>}</h3>
      <Result />
   
    </>
  );
};



let rendering = ReactDOM.createRoot(document.getElementById("root"));
rendering.render(<App />);

