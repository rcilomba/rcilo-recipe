import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { BsSearch } from 'react-icons/bs';
import Modal from 'react-modal';
import scones from './assets/scones.jpeg';
import chickenSalad from './assets/chickenSalad.jpg';
import chickenCurry from './assets/chickenCurry.jpg';
import bananaWaffles from './assets/bananaWaffles.jpeg';
import proteinBars from './assets/proteinBars.jpeg';
import healthyWaffles from './assets/healthyWaffles.jpg';
import applepie from './assets/applepie.jpg';
import strawberryPie from './assets/strawberryPie.jpg';
import cabbageSoup from './assets/cabbageSoup.jpg';
import marinatedChicken from './assets/marinatedChicken.jpg';
import bananaChocolateBalls from './assets/bananaChocolateBalls.jpg';
import wok from './assets/wok.avif';
import salmonPasta from './assets/salmonPasta.jpg';

// Set app element for the modal
Modal.setAppElement('#root');

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'https://rcilo-recipe.onrender.com';

const IMAGE_MAP = {
  'scones.jpeg': scones,
  'chickenSalad.jpg': chickenSalad,
  'chickenCurry.jpg': chickenCurry,
  'bananaWaffles.jpeg': bananaWaffles,
  'proteinBars.jpeg': proteinBars,
  'healthyWaffles.jpg': healthyWaffles,
  'applepie.jpg': applepie,
  'strawberryPie.jpg': strawberryPie,
  'cabbageSoup.jpg': cabbageSoup,
  'marinatedChicken.jpg': marinatedChicken,
  'bananaChocolateBalls.jpg': bananaChocolateBalls,
  'wok.avif': wok,
  'salmonPasta.jpg': salmonPasta,
};

function normalizeRecipe(recipe) {
  return {
    ...recipe,
    imageSrc: IMAGE_MAP[recipe.image] || null,
    ingredients: recipe.ingredients || [],
    cooking: recipe.cooking || [],
  };
}

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRecipes = async (search = '') => {
    try {
      setLoading(true);
      setError('');

      const query = search.trim()
        ? `?search=${encodeURIComponent(search.trim())}`
        : '';
      // Try backend first
      let data = null;
      try {
        const response = await fetch(`${API_BASE_URL}/recipes${query}`);
        if (response.ok) {
          data = await response.json();
        } else {
          throw new Error('Backend svarade med fel.');
        }
      } catch (backendErr) {
        // Fallback to static JSON served by the frontend (public/recipes.json)
        try {
          const resp2 = await fetch(`/recipes.json`);
          if (resp2.ok) {
            data = await resp2.json();
          } else {
            throw new Error('Fallback JSON saknas');
          }
        } catch (fallbackErr) {
          throw backendErr;
        }
      }
      const normalized = data.map(normalizeRecipe);
      setRecipes(normalized);
    } catch (fetchError) {
      setError(fetchError.message || 'Något gick fel.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Live search: debounce input changes
  const debounceRef = useRef(null);
  useEffect(() => {
    // skip debounce if user cleared and no recipes yet? still allow
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchRecipes(searchVal);
    }, 400);
    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal]);

  // const recipeCount = recipes.length;

  function handleSearchClick() {
    fetchRecipes(searchVal);
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
    <div className='page-shell'>
      <div className='ambient ambient-one' />
      <div className='ambient ambient-two' />

      <main className='app-frame'>
        <section className='hero-card'>
          <div className='hero-copy'>
            <p className='eyebrow'>Ramma's receptbok</p>
            <h1>En modern samling recept, direkt i mobilen.</h1>
            <p className='hero-text'>
              Sök bland favoriterna, öppna recept i en snygg modal och låt
              databasen sköta resten.
            </p>
          </div>

          <div className='search-shell'>
            <div className='search-field'>
              <BsSearch className='search-icon' />
              <input
                id='search'
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder='Sök efter recept...'
              />
            </div>
            <button onClick={handleSearchClick} className='search-button'>
              Sök
            </button>
          </div>
        </section>

        <section className='recipes-section'>
          {loading && (
            <p className='status-message'>Laddar recept från databasen...</p>
          )}
          {error && <p className='status-message error'>{error}</p>}

          {!loading && !error && recipes.length === 0 && (
            <div className='empty-state'>
              <h2>Inga recept hittades</h2>
              <p>Testa ett annat sökord eller rensa sökfältet.</p>
            </div>
          )}

          <div className='recipes-grid'>
            {recipes.map((recipe) => (
              <article
                key={recipe.id}
                className='recipe-card'
                onClick={() => openModal(recipe)}
              >
                <div className='recipe-image-wrap'>
                  <img
                    src={recipe.imageSrc || recipe.image}
                    alt={recipe.title}
                    className='recipe-image'
                  />
                  {recipe.time && (
                    <span className='recipe-chip'>{recipe.time}</span>
                  )}
                </div>

                <div className='recipe-body'>
                  <h3>{recipe.title}</h3>
                  <ul className='ingredient-preview'>
                    {recipe.ingredients.slice(0, 4).map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                    {recipe.ingredients.length > 4 && (
                      <li className='ingredient-more'>
                        +{recipe.ingredients.length - 4} till
                      </li>
                    )}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Recipe Details'
          className='recipe-modal'
          overlayClassName='recipe-overlay'
        >
          {selectedRecipe && (
            <div className='modal-layout'>
              <div className='modal-image-wrap'>
                <img
                  src={selectedRecipe.imageSrc || selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className='modal-image'
                />
                {selectedRecipe.time && (
                  <span className='recipe-chip modal-chip'>
                    {selectedRecipe.time}
                  </span>
                )}
              </div>

              <div className='modal-content'>
                <div className='modal-header'>
                  <div>
                    <p className='eyebrow'>Receptdetaljer</p>
                    <h2>{selectedRecipe.title}</h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className='close-button'
                    aria-label='Stäng'
                  >
                    ×
                  </button>
                </div>

                <div className='modal-grid'>
                  <section>
                    <h4>Ingredienser</h4>
                    <ul className='detail-list'>
                      {selectedRecipe.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h4>Tillagning</h4>
                    {selectedRecipe.cooking.length > 0 ? (
                      <ol className='detail-list ordered'>
                        {selectedRecipe.cooking.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    ) : (
                      <p className='muted-copy'>
                        Inga tillagningsinstruktioner tillgängliga.
                      </p>
                    )}
                  </section>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}

export default App;
