CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  elo_rating INTEGER DEFAULT 1200,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  white_user_id INTEGER REFERENCES users(id),
  black_user_id INTEGER REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending',
  winner_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE moves (
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  move_number INTEGER NOT NULL,
  from_square VARCHAR(5),
  to_square VARCHAR(5),
  piece VARCHAR(20),
  promotion VARCHAR(20),
  fen_before TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
