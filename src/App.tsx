import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, MapPin, Search, Trophy } from 'lucide-react'

type Restaurant = {
  id: number
  name: string
  address: string
  image: string
  menu: string
  maps: string
  offerings: string[]
  trophies: number
  badge?: string
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Luigi's Pizzeria",
    address: '214 Lantern Lane, Chicago, IL',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    menu: 'https://example.com/menu/luigis',
    maps: 'https://maps.google.com',
    offerings: ['Gluten-free cheese pizza', 'Pepperoni pizza', 'Dessert bites'],
    trophies: 4,
  },
  {
    id: 2,
    name: 'Fiesta Mexicana',
    address: '123 Enchantment Ln, Spelsiville, USA',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
    menu: 'https://example.com/menu/fiesta',
    maps: 'https://maps.google.com',
    offerings: ['Grilled Chicken & Rice', 'GF Tacos & Enchiladas', 'Chips & Guacamole'],
    trophies: 5,
    badge: 'House Favorite!'
  },
  {
    id: 3,
    name: 'The Cauldron Café',
    address: '9 Castle Court, Orlando, FL',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80',
    menu: 'https://example.com/menu/cauldron',
    maps: 'https://maps.google.com',
    offerings: ['Gluten-free pancakes', 'Hot chocolate', 'Fruit cups'],
    trophies: 5,
  },
  {
    id: 4,
    name: 'Bakery Hall',
    address: '44 Sugar Street, Nashville, TN',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80',
    menu: 'https://example.com/menu/bakery',
    maps: 'https://maps.google.com',
    offerings: ['Cookies', 'Cupcakes', 'Muffins'],
    trophies: 4,
  },
  {
    id: 5,
    name: 'Enchanted Eats',
    address: '80 Quill Road, Denver, CO',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1200&q=80',
    menu: 'https://example.com/menu/eats',
    maps: 'https://maps.google.com',
    offerings: ['Burger on GF bun', 'Protected fryer fries', 'Chicken strips'],
    trophies: 5,
  },
  {
    id: 6,
    name: 'Pasta Castle',
    address: '77 Blue Trim Ave, Phoenix, AZ',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=1200&q=80',
    menu: 'https://example.com/menu/pasta',
    maps: 'https://maps.google.com',
    offerings: ['GF pasta', 'Cream sauce', 'Roasted chicken'],
    trophies: 5,
  },
]

const tabs = ['Pizzas', 'Pancakes', 'Pasta', 'Bakery', 'Grilled Chicken', 'Mexican Rice']

function Trophies({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return (
    <div className="trophies">
      {Array.from({ length: 5 }).map((_, i) => (
        <Trophy
          key={i}
          size={size}
          strokeWidth={1.9}
          className={i < count ? 'trophy on' : 'trophy off'}
        />
      ))}
    </div>
  )
}

function SamAvatar() {
  return (
    <div className="sam-avatar" aria-hidden="true">
      <div className="sam-sparkle">✦</div>
      <div className="sam-head">
        <div className="sam-hair" />
        <div className="sam-eye left" />
        <div className="sam-eye right" />
        <div className="sam-mouth" />
      </div>
      <div className="sam-robe" />
      <div className="sam-trim" />
      <div className="sam-arm left" />
      <div className="sam-arm right" />
      <div className="sam-wand" />
    </div>
  )
}

function CategoryTab({ label, active = false }: { label: string; active?: boolean }) {
  return <div className={`category-tab ${active ? 'active' : ''}`}>{label}</div>
}

function Tile({
  restaurant,
  featured = false,
  titleStyle = 'brown',
  onClick,
}: {
  restaurant: Restaurant
  featured?: boolean
  titleStyle?: 'brown' | 'blue' | 'dark'
  onClick: () => void
}) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`tile ${featured ? 'featured' : ''}`}
    >
      <img src={restaurant.image} alt={restaurant.name} className="tile-image" />
      <div className="tile-overlay" />
      <div className={`tile-title ${titleStyle}`}>{restaurant.name}</div>
      {featured && (
        <>
          <div className="tile-avatar-wrap">
            <SamAvatar />
          </div>
          <div className="featured-badge">{restaurant.badge ?? 'House Favorite!'}</div>
        </>
      )}
      <div className="tile-trophies">
        <Trophies count={restaurant.trophies} />
      </div>
    </motion.button>
  )
}

export default function App() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Restaurant>(restaurants[1])

  const filtered = useMemo(() => {
    if (!search.trim()) return restaurants
    const q = search.toLowerCase()
    return restaurants.filter(
      (r) => r.name.toLowerCase().includes(q) || r.address.toLowerCase().includes(q),
    )
  }, [search])

  const [r0, r1, r2, r3, r4, r5] = filtered

  return (
    <div className="page">
      <div className="frame">
        <header className="topbar">
          <div className="topbar-pattern" />
          <div className="topbar-inner">
            <div className="brand-wrap">
              <SamAvatar />
              <div className="brand-plaque">
                <div className="plaque-tail" />
                <h1>Sam&apos;s Jams</h1>
              </div>
            </div>

            <div className="rating-grid">
              <div className="stat-card dark">
                <div className="stat-label">Sam&apos;s Rating</div>
                <Trophies count={5} size={18} />
              </div>
              <div className="stat-card dark">
                <div className="stat-label">App Rating</div>
                <Trophies count={4} size={18} />
              </div>
              <div className="stat-card light single-line">
                <div className="stat-label">Seeking • Within 30 Miles</div>
              </div>
              <div className="stat-card dark single-line">
                <div className="stat-label">Map of Requirement</div>
              </div>
            </div>
          </div>
        </header>

        <main className="content-shell">
          <div className="content-pattern" />
          <section className="content-card">
            <h2>Welcome to the Great Hall of Gluten-Free Quests!</h2>

            <div className="category-row">
              {tabs.map((tab, i) => (
                <CategoryTab key={tab} label={tab} active={i === tabs.length - 1} />
              ))}
            </div>

            <div className="search-wrap">
              <Search className="search-icon" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search the enchanted map..."
                className="search-input"
              />
            </div>

            <div className="tile-grid">
              {r0 && <Tile restaurant={r0} onClick={() => setSelected(r0)} />}
              {r1 && <Tile restaurant={r1} featured onClick={() => setSelected(r1)} />}
              {r2 && <Tile restaurant={r2} titleStyle="dark" onClick={() => setSelected(r2)} />}
              {r3 && <Tile restaurant={r3} onClick={() => setSelected(r3)} />}
              {r4 && <Tile restaurant={r4} onClick={() => setSelected(r4)} />}
              {r5 && <Tile restaurant={r5} titleStyle="blue" onClick={() => setSelected(r5)} />}
            </div>

            <section className="detail-card">
              <div className="detail-head">
                <h3>{selected.name}</h3>
                <p>{selected.address}</p>
              </div>

              <div className="detail-body">
                <div>
                  <div className="detail-title">Gluten Free Offerings:</div>
                  <ul className="offering-list">
                    {selected.offerings.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-side">
                  <div className="side-kicker">Great Hall Approved</div>
                  <div className="side-score-row">
                    <Trophies count={selected.trophies} size={20} />
                    <div className="safe-pill">Safe Pick</div>
                  </div>
                  <p className="quest-note">
                    Strong gluten-free energy, kid-friendly choices, and the kind of menu you can trust when everybody is hungry.
                  </p>
                  <div className="button-stack">
                    <ButtonLink href={selected.menu} kind="primary">
                      View Menu <ExternalLink size={16} />
                    </ButtonLink>
                    <ButtonLink href={selected.maps} kind="secondary">
                      Get Directions <MapPin size={16} />
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  )
}

function ButtonLink({
  href,
  kind,
  children,
}: {
  href: string
  kind: 'primary' | 'secondary'
  children: React.ReactNode
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`btn ${kind}`}>
      <span>{children}</span>
    </a>
  )
}
