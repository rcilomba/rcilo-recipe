import React, { useState } from "react";
import "./index.css";
import { BsSearch } from "react-icons/bs";
import Modal from "react-modal";
import scones from "./assets/scones.jpeg";
import chickenSalad from "./assets/chickenSalad.jpg";
import chickenCurry from "./assets/chickenCurry.jpg";
import bananaWaffles from "./assets/bananaWaffles.jpeg";
import proteinBars from "./assets/proteinBars.jpeg";
import healthyWaffles from "./assets/healthyWaffles.jpg";
import applepie from "./assets/applepie.jpg";
import strawberryPie from "./assets/strawberryPie.jpg";
import cabbageSoup from "./assets/cabbageSoup.jpg";
import marinatedChicken from "./assets/marinatedChicken.jpg";
import bananaChocolateBalls from "./assets/bananaChocolateBalls.jpg";
import wok from "./assets/wok.avif";
import salmonPasta from "./assets/salmonPasta.jpg";

// Set app element for the modal
Modal.setAppElement("#root");

function App() {
  const recipeList = [
    {
      title: "Scones",
      time: "250°, 10-12 min",
      ingredients: [
        "4 dl mjöl",
        "2 stk bakpulver",
        "2 krm salt",
        "50 g smör",
        "2 dl mjölk",
      ],
      cooking: [
        "1 dl torkat frukt",
        "1 dl nötter/mandel",
        "⅕ g saffran",
        "1 st kanel + 2 tsk socker",
        "1 tsk kardemumma + 1 tsk socker",
      ],
      image: scones,
    },
    {
      title: "Salad",
      time: "",
      ingredients: [
        "kyckling",
        "(pasta)",
        "saladsblad",
        "ceasarsås?",
        "brödtärning",
        "kokta ägg",
      ],
      cooking: [],
      image: chickenSalad,
    },
    {
      title: "Kyckling Curry",
      time: "",
      ingredients: [
        "kyckling",
        "olja",
        "curry",
        "paprikakrydda",
        "lök",
        "grädde",
      ],
      cooking: [
        "Maninera kyckling:",
        "Tillsätt olja och, paprikakrydda curry",
        "Stek lök",
        "Lägg till maninerade kyckling och stek tillsammans med löken",
        "Tillsätt grädde till slut",
      ],
      image: chickenCurry,
    },
    {
      title: "Maninerad kyckling",
      time: "225°, 30-45 min",
      ingredients: [
        "2 ½  msk solja",
        "1 msk ketchup",
        "1 tsk rosmarin",
        "1 tsk oregano",
        "1 msk rapsolja",
        "½ tsk nymalen svartpeppar",
        "1 vitlöksklyfta",
        "3 msk smör",
        "1 dl vatten",
      ],
      cooking: [
        "Blanda ingrendienser",
        "Maninera kyckling",
        "lägg i form och lägg till vatten",
        "lägg till en klick smör innan kycklingen ska in i ugnen",
      ],
      image: marinatedChicken,
    },
    {
      title: "Wok",

      ingredients: [
        "vitlök",
        "lök",
        "kyckling",
        "morötter",
        "blomkål",
        "purjulök",
        "glasnudlar",
        "sesamolja",
        "soyasås",
        "oystersås",
        "äppelättika",
      ],
      cooking: [
        "stek vitlök och lök",
        "tillägg kyckling och stek",
        "haka grönsaker och lägg till och stek",
        "koka glasnudlar och lägg i",
        "lägg till sås",
      ],
      image: wok,
    },
    {
      title: "Lax pasta",

      ingredients: [
        "lax",
        "citronpeppar",
        "paprikakrydda",
        "vitlökskrydda",
        "lökkrydda",
        "oregano",
        "olivolja",
        "1 vitlök",
        "tomatpure",
        "grädde",
        "parmesanost",
      ],
      cooking: [
        "maninera laxen med kryddor och olivoja",
        "1 tsk av alla kryddor",
        "stekpanna: stek vitlök, tomatpure",
        "fortsätt steka med grädda i",
        "koka pasta",
        "lägg laxen i stekpannan och stek",
        "häll i pastan i stekpanen och rör om",
      ],
      image: salmonPasta,
    },
    {
      title: "Bananvåfflor",
      time: "",
      ingredients: [
        "2 bananer",
        "1 dl keso",
        "4 ägg",
        "1 ½ tsk bakpulver",
        "½ dl havregryn",
        "½ tsk kanel",
        "kokosolja",
      ],
      cooking: ["Stek med kokosolja"],
      image: bananaWaffles,
    },
    {
      title: "Protein bar",
      time: "1 h",
      ingredients: [
        "2 dl nötter",
        "1 dl kokos",
        "½ dl kakao",
        "2 tsk chiafrön",
        "⅓ dl jordnötssmör",
        "½ dl kokosolja",
        "2 msk honung",
      ],
      cooking: ["Hacka nötter", "Blanda resterande", "In i frysen i minst 1h."],
      image: proteinBars,
    },
    {
      title: "Äppelpaj",
      time: "225°, 25 min",
      ingredients: [
        "5 äpplen",
        "1 dl socker",
        "1 msk kanel",
        "Deg:",
        "1 ½ dl vetemjöl",
        "1 dl socker",
        "100 g smör/margarin",
      ],
      cooking: [
        "Blanda första sektionen",
        "Andra sektionen, deg",
        "I ugn i 225° i 25 min",
      ],
      image: applepie,
    },
    {
      title: "Jordgubsspaj",
      time: "175°, 25 min",
      ingredients: [
        "125 g smör (smält)",
        "4 msk socker",
        "1 msk sirap",
        "1 dl vetemjöl",
        "2 dl havregryn",
        "1 krm salt",
        "Fyllning:",
        "jordgubbar",
        "1 tsk socker",
        "1 tsk smör (formen)",
      ],
      cooking: [
        "Blanda första sektionen",
        "Andra sektionen, fyllning",
        "I ugn i 175° i 25 min",
      ],
      image: strawberryPie,
    },
    {
      title: "Nyttiga våfflor",
      ingredients: [
        "½ dl havregryn",
        "1 tsk bakpulver",
        "1 tsk vaniljsocker",
        "2 st ägg",
        "½ dl kvarg",
        "rapsolja",
      ],
      cooking: ["Blanda och stek med rapsolja"],
      image: healthyWaffles,
    },
    {
      title: "Bananchokladbolar",
      ingredients: [
        "2 mogna bananer",
        "2 msk kakao",
        "3 dl havegryn",
        "1 dl kokos",
        "1 dl kaffe usch",
        "1 dk kokos",
      ],
      cooking: ["Blanda och rulla i kokos"],
      image: bananaChocolateBalls,
    },
    {
      title: "Kålsoppa",
      time: "25 min",
      ingredients: [
        "4 dl vatten, (2-3 liter)",
        "2-3 msk honung",
        "1 msk socker",
        "6 st kryddpepparkorn, hela",
        "4 tärningar köttbuljong",
        "1 kg vitkål",
      ],
      cooking: ["Koka tillsammans", "Småkoka i 1,5h"],
      image: cabbageSoup,
    },
  ];

  const [recipes, setRecipes] = useState(recipeList);
  const [searchVal, setSearchVal] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleSearchClick() {
    if (searchVal === "") {
      setRecipes(recipeList);
      return;
    }
    const filterBySearch = recipeList.filter((item) =>
      item.title.toLowerCase().includes(searchVal.toLowerCase())
    );
    setRecipes(filterBySearch);
  }

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center text-4xl pb-10 ">Recept</h1>
      <div className="flex justify-center mb-5">
        <label htmlFor="search" className="mr-2">
          Sök:
        </label>
        <input
          id="search"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSearchClick}
          className="ml-2 p-2 bg-green-500 text-white rounded"
        >
          <BsSearch />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-white shadow cursor-pointer"
            onClick={() => openModal(recipe)}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h3 className="text-xl font-bold">{recipe.title}</h3>
            {recipe.time && <p className="text-gray-600">{recipe.time}</p>}
            <h4 className="font-semibold mt-2">Ingredienser:</h4>
            <ul className="list-disc pl-5">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Recipe Details"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedRecipe && (
          <div className="flex flex-col md:flex-row items-center justify-center p-5">
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="w-full md:w-1/2 h-auto rounded-lg mb-4 md:mb-0"
            />
            <div className="flex-1 md:ml-4">
              <h2 className="text-2xl font-bold">{selectedRecipe.title}</h2>
              {selectedRecipe.time && (
                <p className="text-gray-600">{selectedRecipe.time}</p>
              )}
              <h4 className="font-semibold mt-2">Ingredienser:</h4>
              <ul className="list-disc pl-5">
                {selectedRecipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
              <h4 className="font-semibold mt-2">Tillagning:</h4>
              {selectedRecipe.cooking.length > 0 ? (
                <ol className="list-decimal pl-5">
                  {selectedRecipe.cooking.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p>Inga tillagningsinstruktioner tillgängliga.</p>
              )}
              <button
                onClick={closeModal}
                className="mt-4 p-2 bg-green-700 text-white rounded"
              >
                Stäng
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
