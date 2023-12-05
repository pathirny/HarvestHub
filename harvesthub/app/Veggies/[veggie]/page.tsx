import Header from "@/components/Header";

export default function Veggies() {
  const carrot = { name: "carrot", difficulty: [1, 1] };
  let difficulty = carrot.difficulty;

  return (
    <>
      <div id="vegPageContainer">
        <Header></Header>
        <div id="veggie-container">
          <div id="veggie-general-info"></div>
          <div id="veggie-grid">
            <div className="cream">
              <h1>Difficulty:</h1>
            </div>
            <div className="carrot-rating brown">
              {difficulty.map((a) => {
                return (
                  <>
                    <img
                      src="/assets/BlackCarrot.png"
                      alt="black carrot"
                      style={{ height: "8vw", width: "auto" }}
                    ></img>
                  </>
                );
              })}
            </div>
            <div className="cream">
              <h1>Time:</h1>
            </div>
            <div className="brown" ></div>
            <div className="cream">
              <h1>Plant:</h1>
            </div>
            <div className="brown" ></div>
            <div className="cream">
              <h1>Harvest:</h1>
            </div>
            <div className="brown" ></div>
          </div>
        </div>
      </div>
    </>
  );
}
