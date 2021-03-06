import React from 'react';
import "../Dashboard/Dashboard.css"

export const Dashboard = () => {

  const [Food, setFood] = React.useState({
    Amount: "",
    Expiry: "",
    Description: ""
  });

  const formHandler = (e) => {
    e.preventDefault();

    if (Food.Amount === "" || Food.Expiry === "" || Food.Description === "") {
      alert("Please fill in all fields");
    } else {
      console.log(Food);
    }
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setFood((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };
  console.log(Food)

  return (
    <div className="App">
      <div class="container">
        <form id="contact" action="" method="post" onSubmit={formHandler}>
          <h3>Donate Food</h3>
          <fieldset>
            <input
              placeholder="Amount of food(in Kg)"
              type="number"
              tabIndex="1"
              name="Amount"
              required
              autoFocus
              onChange={handleInputChange}
              value={Food.Amount}
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Expiry Date"
              type="text"
              tabindex="3"
              required
              name="Expiry"
              onFocus={(e) => (e.target.type = "datetime-local")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={handleInputChange}
              value={Food.Expiry}
            />
          </fieldset>
          <fieldset>
            <textarea
              placeholder="Food Description"
              tabindex="5"
              name="Description"
              required
              onChange={handleInputChange}
              value={Food.Description}
            ></textarea>
          </fieldset>
          <fieldset>
            <button name="submit" type="submit" id="location-submit">
              AUTO DETECT LOCATION
            </button>
          </fieldset>
          <fieldset>
            <button
              name="submit"
              type="submit"
              id="contact-submit"
              data-submit="...Sending"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}