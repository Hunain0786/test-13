
/*
  # Create products table for AKR Premium Fragrance

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - product name
      - `description` (text) - full description
      - `short_description` (text) - brief tagline
      - `price` (numeric) - price in USD
      - `image_url` (text) - product image URL
      - `category` (text) - e.g. 'Men', 'Women', 'Unisex'
      - `notes` (text) - fragrance notes
      - `size_ml` (integer) - bottle size in ml
      - `in_stock` (boolean) - availability
      - `featured` (boolean) - show on homepage
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `products` table
    - Public read access for product listings
    - No write access for anonymous users

  3. Seed Data
    - 9 sample luxury perfume products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  image_url text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Unisex',
  notes text NOT NULL DEFAULT '',
  size_ml integer NOT NULL DEFAULT 50,
  in_stock boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO products (name, description, short_description, price, image_url, category, notes, size_ml, in_stock, featured) VALUES
(
  'Noir Absolu',
  'A bold and commanding fragrance that opens with smoky oud and dark resins, settling into a warm base of sandalwood and musk. Designed for those who leave an impression without saying a word.',
  'Dark. Intense. Unforgettable.',
  285.00,
  'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Men',
  'Top: Oud, Black Pepper | Heart: Dark Rose, Incense | Base: Sandalwood, Musk',
  100,
  true,
  true
),
(
  'Lumière Dorée',
  'An opulent floral fragrance inspired by golden afternoon light. Jasmine and ylang-ylang bloom over a rich amber and vanilla base, creating a luminous trail that lingers long after you have passed.',
  'Golden. Radiant. Luxurious.',
  265.00,
  'https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Women',
  'Top: Bergamot, Neroli | Heart: Jasmine, Ylang-Ylang | Base: Amber, Vanilla, White Musk',
  75,
  true,
  true
),
(
  'Sable Blanc',
  'Inspired by the quiet expanse of white sand dunes at dusk. A serene, gender-neutral fragrance with soft woody notes anchored by creamy musks and a whisper of sea salt.',
  'Serene. Pure. Timeless.',
  245.00,
  'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Unisex',
  'Top: Sea Salt, Citrus | Heart: Driftwood, White Florals | Base: Creamy Musk, Cedarwood',
  50,
  true,
  true
),
(
  'Velours Rouge',
  'A sensual and rich oriental fragrance. Layers of Bulgarian rose and saffron drape over a sumptuous base of leather, patchouli, and labdanum for a scent that feels like velvet on skin.',
  'Sensual. Rich. Enveloping.',
  310.00,
  'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Women',
  'Top: Saffron, Pink Pepper | Heart: Bulgarian Rose, Iris | Base: Leather, Patchouli, Labdanum',
  100,
  true,
  true
),
(
  'Cèdre Impérial',
  'A distinguished masculine fragrance that evokes the grandeur of ancient cedar forests. Clean and sharp at the opening, deepening into rich tobacco and dark woods with understated elegance.',
  'Distinguished. Commanding. Refined.',
  275.00,
  'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Men',
  'Top: Grapefruit, Cardamom | Heart: Cedarwood, Juniper | Base: Tobacco, Vetiver, Benzoin',
  75,
  true,
  false
),
(
  'Brume de Soie',
  'Delicate and ethereal, this fragrance captures the lightness of silk in morning air. Soft peony and magnolia float on a base of white tea and blonde woods for an effortlessly elegant signature.',
  'Ethereal. Delicate. Effortless.',
  230.00,
  'https://images.pexels.com/photos/1557353/pexels-photo-1557353.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Women',
  'Top: Lychee, Pink Grapefruit | Heart: Peony, Magnolia | Base: White Tea, Blonde Wood',
  50,
  true,
  false
),
(
  'Encens Mystique',
  'Meditative and hypnotic, this unisex fragrance weaves sacred frankincense with resinous labdanum and a dry woody core. An olfactory journey through ancient temples and quiet contemplation.',
  'Sacred. Meditative. Hypnotic.',
  295.00,
  'https://images.pexels.com/photos/1399043/pexels-photo-1399043.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Unisex',
  'Top: Frankincense, Elemi | Heart: Myrrh, Cistus | Base: Oud, Labdanum, Amber',
  100,
  true,
  false
),
(
  'Aqua Minerale',
  'A crisp and invigorating fragrance capturing the purity of mountain spring water. Cucumber and green notes open to a cool heart of lotus and white jasmine, settling on a clean mineral base.',
  'Crisp. Invigorating. Pure.',
  215.00,
  'https://images.pexels.com/photos/755992/pexels-photo-755992.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Men',
  'Top: Cucumber, Mint | Heart: Lotus, White Jasmine | Base: Mineral Accord, Musk',
  50,
  true,
  false
),
(
  'Poudre Précieuse',
  'A warm, powdery fragrance reminiscent of fine cosmetics and intimate spaces. Heliotrope and iris weave through layers of sandalwood and tonka bean in a comforting, skin-close scent.',
  'Warm. Powdery. Intimate.',
  250.00,
  'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Unisex',
  'Top: Bergamot, Aldehydes | Heart: Heliotrope, Iris | Base: Sandalwood, Tonka Bean, Musks',
  75,
  true,
  false
);
