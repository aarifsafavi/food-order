import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const navigate = useNavigate(); // Import useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedMeals = JSON.parse(localStorage.getItem("meals")) || [];
        setMeals(storedMeals);
      } catch (error) {
        console.error("Error fetching data from local storage:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only on mount

  const openAddPopup = () => {
    setShowAddPopup(true);
  };

  const closeAddPopup = () => {
    setShowAddPopup(false);
    setNewMeal("");
    setNewDesc("");
    setNewPrice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      newMeal.trim() !== "" &&
      newDesc.trim() !== "" &&
      newPrice.trim() !== ""
    ) {
      try {
        if (editingIndex !== null) {
          const updatedMeals = [...meals];
          updatedMeals[editingIndex] = {
            name: newMeal,
            description: newDesc,
            price: newPrice,
          };
          setMeals(updatedMeals);

          // Save meals to local storage after updating the state
          await localStorage.setItem("meals", JSON.stringify(updatedMeals));
          setEditingIndex(null);
        } else {
          const updatedMeals = [
            ...meals,
            { name: newMeal, description: newDesc, price: newPrice },
          ];
          setMeals(updatedMeals);

          // Save meals to local storage after updating the state
          await localStorage.setItem("meals", JSON.stringify(updatedMeals));
        }

        closeAddPopup();
      } catch (error) {
        console.error("Error storing data in local storage:", error);
      }
    }
  };

  const editMeal = (index) => {
    const selectedMeal = meals[index];
    setNewMeal(selectedMeal.name);
    setNewDesc(selectedMeal.description);
    setNewPrice(selectedMeal.price);
    setEditingIndex(index);
    openAddPopup();
  };

  const removeMeal = async (index) => {
    try {
      const updatedMeals = [...meals];
      updatedMeals.splice(index, 1);
      setMeals(updatedMeals);
      setEditingIndex(null);

      // Save meals to local storage after updating the state
      await localStorage.setItem("meals", JSON.stringify(updatedMeals));
    } catch (error) {
      console.error("Error storing data in local storage:", error);
    }
  };

  const navigateToHome = () => {
    navigate("/"); // Use navigate to navigate to "/"
  };

  return (
    <div>
      <h1 className="admin-header">Admin Page</h1>
      <div>
        <h2 className="admin-header">Admin Meals List</h2>
        <div className="admin-mainbutton">
          <button onClick={openAddPopup}>Add Meal</button>
          <button className="admin-exit" onClick={navigateToHome}>
            Exit
          </button>
        </div>

        {showAddPopup && (
          <div>
            <form className="form-admin" onSubmit={handleSubmit}>
              <div>
                <label>
                  Meal:
                  <input
                    type="text"
                    value={newMeal}
                    onChange={(e) => setNewMeal(e.target.value)}
                    placeholder="Enter meal name"
                  />
                </label>
              </div>
              <div>
                <label>
                  Description:
                  <input
                    type="text"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Enter meal description"
                  />
                </label>
              </div>
              <div>
                <label>
                  Price:
                  <input
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="Enter meal price"
                  />
                </label>
              </div>
              <div>
                <button type="submit">
                  {editingIndex !== null ? "Edit Meal" : "Add Meal"}
                </button>
                <button type="button" onClick={closeAddPopup}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <ul>
          {meals.map((meal, index) => (
            <li key={index}>
              {meal.name} - {meal.description} - ${meal.price}
              <div className="admin-button">
                <button onClick={() => editMeal(index)}>Edit</button>
                <button onClick={() => removeMeal(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
