import "./App.css";
import React, { useState } from "react";

const style = {
  table: {
    borderCollapse: "collapse"
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px"
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px"
    },
    inputs: {
      marginBottom: "5px"
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px"
    },
    errorMsg: {
      fontSize: "12px",
      color: "red"
    }
  }
};

function PhoneBookForm(props) {
  const [state, setState] = useState({
    firstName: "Coder",
    lastName: "Byte",
    phone: "8885559999"
  });

  const [error, setError] = useState("");

  const setInfo = evt => {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  };

  const reset = () => {
    setState({
      ...state,
      firstName: "",
      lastName: "",
      phone: ""
    });
  };

  const handleSubmit = () => {
    if (validate()) {
      props.callback(state);
      setError("");
    }
    reset();
  };

  const validate = () => {
    if (
      (state.firstName === "") |
      (state.lastName === "") |
      (state.phone === "")
    ) {
      setError("Please confirm if all fields are filled out.");
      return false;
    }
    return true;
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
      style={style.form.container}
    >
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="firstName"
        type="text"
        value={state.firstName}
        onChange={setInfo}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="lastName"
        type="text"
        value={state.lastName}
        onChange={setInfo}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="phone"
        type="text"
        value={state.phone}
        onChange={setInfo}
      />
      <br />
      {error && <p style={style.form.errorMsg}>{error}</p>}
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
        onClick={handleSubmit}
      />
    </form>
  );
}

function InformationTable(props) {
  props.infos.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    }
    if (a.lastName > b.lastName) {
      return 1;
    }
    return 0;
  });
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
        {props.infos &&
          props.infos.length > 0 &&
          props.infos.map((item, index) => (
            <tr key={index}>
              <td style={style.tableCell}>{item.firstName}</td>
              <td style={style.tableCell}>{item.lastName}</td>
              <td style={style.tableCell}>{item.phone}</td>
            </tr>
          ))}
      </thead>
    </table>
  );
}

function App() {
  const [data, setData] = useState([]);

  const callback = infos => {
    setData(prev => [...prev, infos]);
  };

  return (
    <section>
      <PhoneBookForm callback={callback} />
      <InformationTable infos={data} />
    </section>
  );
}

export default App;
