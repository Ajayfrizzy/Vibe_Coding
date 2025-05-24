/*
  # Initial database schema for FarmConnect

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `user_type` (text, either 'farmer' or 'buyer')
      - `location` (text)
      - `created_at` (timestamp)
      - `avatar_url` (text)
      - `phone` (text)

    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `price` (numeric)
      - `quantity` (numeric)
      - `unit` (text)
      - `farmer_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `image_url` (text)
      - `location` (text)

    - `market_prices`
      - `id` (uuid, primary key)
      - `product` (text)
      - `price` (numeric)
      - `market` (text)
      - `location` (text)
      - `updated_at` (timestamp)

    - `price_alerts`
      - `id` (uuid, primary key)
      - `product` (text)
      - `min_price` (numeric)
      - `max_price` (numeric)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `active` (boolean)

    - `messages`
      - `id` (uuid, primary key)
      - `sender_id` (uuid, foreign key)
      - `receiver_id` (uuid, foreign key)
      - `content` (text)
      - `created_at` (timestamp)
      - `read` (boolean)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read/write their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  user_type text NOT NULL CHECK (user_type IN ('farmer', 'buyer')),
  location text,
  created_at timestamptz DEFAULT now(),
  avatar_url text,
  phone text
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  price numeric NOT NULL,
  quantity numeric NOT NULL,
  unit text NOT NULL,
  farmer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  image_url text,
  location text
);

-- Create market_prices table
CREATE TABLE IF NOT EXISTS market_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product text NOT NULL,
  price numeric NOT NULL,
  market text NOT NULL,
  location text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Create price_alerts table
CREATE TABLE IF NOT EXISTS price_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product text NOT NULL,
  min_price numeric,
  max_price numeric,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  active boolean DEFAULT true
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create policies for products
CREATE POLICY "Anyone can view products" 
  ON products 
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Farmers can insert their own products" 
  ON products 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can update their own products" 
  ON products 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = farmer_id);

CREATE POLICY "Farmers can delete their own products" 
  ON products 
  FOR DELETE 
  TO authenticated 
  USING (auth.uid() = farmer_id);

-- Create policies for market_prices
CREATE POLICY "Anyone can view market prices" 
  ON market_prices 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create policies for price_alerts
CREATE POLICY "Users can view their own price alerts" 
  ON price_alerts 
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own price alerts" 
  ON price_alerts 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own price alerts" 
  ON price_alerts 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own price alerts" 
  ON price_alerts 
  FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Create policies for messages
CREATE POLICY "Users can view messages they sent or received" 
  ON messages 
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" 
  ON messages 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update messages they sent" 
  ON messages 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = sender_id);

CREATE POLICY "Receivers can mark messages as read" 
  ON messages 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = receiver_id)
  WITH CHECK (auth.uid() = receiver_id AND (read = true));

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_products_farmer_id ON products(farmer_id);
CREATE INDEX IF NOT EXISTS idx_messages_participants ON messages(sender_id, receiver_id);
CREATE INDEX IF NOT EXISTS idx_price_alerts_user ON price_alerts(user_id);

-- Add validation constraints
ALTER TABLE products ADD CONSTRAINT positive_price CHECK (price > 0);
ALTER TABLE products ADD CONSTRAINT positive_quantity CHECK (quantity >= 0);
ALTER TABLE market_prices ADD CONSTRAINT positive_market_price CHECK (price > 0);
ALTER TABLE price_alerts ADD CONSTRAINT valid_price_range CHECK (min_price < max_price);