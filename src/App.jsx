import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState("");

  useEffect(()=>{
    getTransactions().then(setTransactions);
  },[]);

  async function getTransactions(){
    const url = "http://localhost:5173/api"+ "/transactions";
    const response = await fetch(url);
    return await response.json();
  }

  async function addNewTransaction(e) {
    e.preventDefault();
    const url = "http://localhost:5173/api"+ "/transaction";
    console.log(url);
    const price = name.split(" ")[0];
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          price,
          name: name.substring(price.length + 1),
          description,
          datetime,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setName("");
      setDatetime("");
      setDescription("");
      console.log("result", json);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  }

  let balance =0;
  for(const transaction in transactions){
    balance=balance+transaction.price;
  }
  balance=balance.toFixed(2);

  return (
    <main>
      <h1>
        {balance}
        
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"+200 new samsung tv"}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
          />
        </div>
        <button type="submit">Add new transcation</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction, index) => (
            <div key={index} className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                {/* console.log(transaction.price); */}
                <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
