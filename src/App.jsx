import React, { useMemo, useState } from 'react';

const restaurants = [
  {
    id: 1,
    name: "Luigi's Pizzeria",
    ribbon: "Pizza Magic",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    address: "214 Lantern Lane, Chicago, IL",
    menu: "https://example.com/menu/luigis",
    maps: "https://maps.google.com",
    offerings: ["GF cheese pizza", "Pepperoni pizza", "Safe fries", "Brownie bites"],
    trophies: 4,
    featured: false,
    tone: 'amber'
  },
  {
    id: 2,
    name: "Fiesta Mexicana",
    ribbon: "House Favorite!",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
    address: "123 Enchantment Ln, Spelsiville, USA",
    menu: "https://example.com/menu/fiesta",
    maps: "https://maps.google.com",
    offerings: ["Grilled Chicken & Rice", "GF Tacos & Enchiladas", "Chips & Guacamole"],
    trophies: 5,
    featured: true,
    tone: 'amber'
  },
  {
    id: 3,
    name: "The Cauldron Café",
    ribbon: "Breakfast Win",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80",
    address: "9 Castle Court, Orlando, FL",
    menu: "https://example.com/menu/cauldron",
    maps: "https://maps.google.com",
    offerings: ["GF pancakes", "Fruit cups", "Hot chocolate", "Eggs & bacon"],
    trophies: 5,
    featured: false,
    tone: 'dark'
  },
  {
    id: 4,
    name: "Bakery Hall",
    ribbon: "Sweet Spells",
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80",
    address: "44 Sugar Street, Nashville, TN",
    menu: "https://example.com/menu/bakery",
    maps: "https://maps.google.com",
    offerings: ["Cookies", "Cupcakes", "Muffins", "Mini cakes"],
    trophies: 4,
    featured: false,
    tone: 'amber'
  },
  {
    id: 5,
    name: "Enchanted Eats",
    ribbon: "Protected Fryer",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1200&q=80",
    address: "80 Quill Road, Denver, CO",
    menu: "https://example.com/menu/eats",
    maps: "https://maps.google.com",
    offerings: ["Burger on GF bun", "Protected fryer fries", "Chicken strips", "Shakes"],
    trophies: 5,
    featured: false,
    tone: 'amber'
  },
  {
    id: 6,
    name: "Pasta Castle",
    ribbon: "Great Hall Approved",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=1200&q=80",
    address: "77 Blue Trim Ave, Phoenix, AZ",
    menu: "https://example.com/menu/pasta",
    maps: "https://maps.google.com",
    offerings: ["GF pasta", "Cream sauce", "Roasted chicken", "Herb rice"],
    trophies: 5,
    featured: false,
    tone: 'blue'
  }
];

const tabs = ['Pizzas', 'Pancakes', 'Pasta', 'Bakery', 'Grilled Chicken', 'Mocain Bite'];

function Trophies({ count }) {
  return (
    <div className="trophies" aria-label={`${count} trophies`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 'trophy on' : 'trophy off'}>🏆</span>
      ))}
    </div>
  );
}

function Tile({ restaurant, onPick }) {
  return (
    <button className={`tile ${restaurant.featured ? 'featured' : ''}`} onClick={() => onPick(restaurant)}>
      <img className="tile-image" src={restaurant.image} alt={restaurant.name} />
      <div className="tile-overlay" />
      <div className={`tile-title ${restaurant.tone}`}>{restaurant.name}</div>
      {restaurant.featured && (
        <>
          <img className="tile-logo" src="/sams-jams-logo.png" alt="Sam's Jams logo" />
          <div className="tile-ribbon featured-ribbon">{restaurant.ribbon}</div>
        </>
      )}
      {!restaurant.featured && <div className="tile-ribbon">{restaurant.ribbon}</div>}
      <div className="tile-bottom"><Trophies count={restaurant.trophies} /></div>
    </button>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(restaurants[1]);

  const filtered = useMemo(() => {
    if (!query.trim()) return restaurants;
    const q = query.toLowerCase();
    return restaurants.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.address.toLowerCase().includes(q) ||
      r.ribbon.toLowerCase().includes(q)
    );
  }, [query]);

  const grid = [...filtered];

  return (
    <div className="page-shell">
      <div className="sparkle sparkle-1">✦</div>
      <div className="sparkle sparkle-2">✦</div>
      <div className="sparkle sparkle-3">✦</div>
      <div className="sparkle sparkle-4">✦</div>
      <div className="app-frame">
        <header className="hero-bar">
          <div className="hero-left">
            <img className="hero-logo" src="/sams-jams-logo.png" alt="Sam's Jams logo" />
            <div className="hero-title-wrap">
              <div className="hero-title">Sam’s Jams</div>
            </div>
          </div>
          <div className="hero-right">
            <div className="rating-card">
              <div className="rating-label">Sam’s Rating</div>
              <Trophies count={5} />
            </div>
            <div className="rating-card">
              <div className="rating-label">App Rating</div>
              <Trophies count={4} />
            </div>
            <div className="seeking-card">Seeking • Within 30 Miles</div>
            <div className="map-card">Map of Requirement</div>
          </div>
        </header>

        <main className="content-panel">
          <section className="intro-panel">
            <h1 className="great-hall-title">Welcome to the Great Hall of Gluten-Free Quests!</h1>
            <div className="tab-row">
              {tabs.map((tab, index) => (
                <div key={tab} className={`tab-chip ${index === tabs.length - 1 ? 'active' : ''}`}>{tab}</div>
              ))}
            </div>
            <div className="search-row">
              <input
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the enchanted map..."
              />
            </div>

            <div className="tile-grid">
              {grid[0] && <Tile restaurant={grid[0]} onPick={setSelected} />}
              {grid[1] && <Tile restaurant={grid[1]} onPick={setSelected} />}
              {grid[2] && <Tile restaurant={grid[2]} onPick={setSelected} />}
              {grid[3] && <Tile restaurant={grid[3]} onPick={setSelected} />}
              {grid[4] && <Tile restaurant={grid[4]} onPick={setSelected} />}
              {grid[5] && <Tile restaurant={grid[5]} onPick={setSelected} />}
            </div>

            {selected && (
              <section className="detail-scroll">
                <div className="detail-heading">{selected.name}</div>
                <div className="detail-address">{selected.address}</div>
                <div className="detail-body">
                  <div>
                    <div className="detail-subtitle">Gluten Free Offerings:</div>
                    <ul className="offering-list">
                      {selected.offerings.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <aside className="detail-side">
                    <div className="detail-badge">Great Hall Approved</div>
                    <Trophies count={selected.trophies} />
                    <p className="detail-note">
                      Strong gluten-free energy, kid-friendly picks, and the kind of place you choose when everyone is hungry and nobody wants a gluten gamble.
                    </p>
                    <div className="button-stack">
                      <a className="magic-button" href={selected.menu} target="_blank" rel="noreferrer">View Menu</a>
                      <a className="magic-button outline" href={selected.maps} target="_blank" rel="noreferrer">Get Directions</a>
                    </div>
                  </aside>
                </div>
              </section>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
