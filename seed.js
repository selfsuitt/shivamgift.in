const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');

const products = [
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'The latest flagship from Samsung with 200MP camera, Snapdragon 8 Gen 3 processor, 12GB RAM, and 256GB storage. Features AI-powered photography and S Pen support.',
    price: 124999, discountPrice: 109999, category: 'Electronics',
    stock: 50, brand: 'Samsung', featured: true, tags: ['smartphone', '5G', 'flagship'],
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'],
    ratings: 4.8, numReviews: 234
  },
  {
    name: 'Apple MacBook Pro 14"',
    description: 'Apple M3 Pro chip, 18GB unified memory, 512GB SSD. Stunning Liquid Retina XDR display with ProMotion technology. Perfect for professionals.',
    price: 199900, discountPrice: 189900, category: 'Electronics',
    stock: 25, brand: 'Apple', featured: true, tags: ['laptop', 'mac', 'professional'],
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
    ratings: 4.9, numReviews: 189
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation with Dual Noise Sensor technology. 30-hour battery life. Crystal clear hands-free calling with Auto Noise Cancelling Optimizer.',
    price: 29990, discountPrice: 24990, category: 'Electronics',
    stock: 100, brand: 'Sony', featured: false, tags: ['headphones', 'audio', 'wireless'],
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    ratings: 4.7, numReviews: 456
  },
  {
    name: 'Men\'s Premium Linen Shirt',
    description: 'Premium quality linen shirt, perfect for summer. Available in multiple colors. Breathable fabric with modern slim-fit design.',
    price: 2499, discountPrice: 1799, category: 'Clothing',
    stock: 200, brand: 'RDshivam Fashion', featured: false, tags: ['shirt', 'men', 'linen'],
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'],
    ratings: 4.3, numReviews: 78
  },
  {
    name: 'Nike Air Max 2024',
    description: 'Iconic Air Max cushioning with modern design. Lightweight mesh upper for breathability. Durable rubber outsole for long-lasting wear.',
    price: 12995, discountPrice: 9999, category: 'Clothing',
    stock: 150, brand: 'Nike', featured: true, tags: ['shoes', 'sneakers', 'sports'],
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    ratings: 4.6, numReviews: 312
  },
  {
    name: 'The Psychology of Money',
    description: 'Morgan Housel shares 19 short stories exploring the strange ways people think about money. A timeless lessons on wealth, greed, and happiness.',
    price: 499, discountPrice: 299, category: 'Books',
    stock: 500, brand: 'Jaico Publishing', featured: false, tags: ['finance', 'self-help', 'bestseller'],
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'],
    ratings: 4.8, numReviews: 1234
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: 'Multi-use programmable pressure cooker. Functions as pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker & warmer. 6 Quart capacity.',
    price: 8999, discountPrice: 6499, category: 'Home & Kitchen',
    stock: 75, brand: 'Instant Pot', featured: false, tags: ['kitchen', 'cooking', 'appliance'],
    images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=500'],
    ratings: 4.5, numReviews: 567
  },
  {
    name: 'Yoga Mat Premium Anti-Slip',
    description: 'Extra thick 6mm yoga mat with superior grip and cushioning. Eco-friendly TPE material. Includes carrying strap. 183cm x 61cm.',
    price: 1999, discountPrice: 1299, category: 'Sports',
    stock: 300, brand: 'FitLife', featured: false, tags: ['yoga', 'fitness', 'exercise'],
    images: ['https://images.unsplash.com/photo-1601925228561-0b3d5b6e1dfb?w=500'],
    ratings: 4.4, numReviews: 234
  },
  {
    name: 'Lakme Absolute Skin Natural Mousse',
    description: 'Lightweight mousse foundation with SPF 8. Blends seamlessly into skin for a natural finish. Available in 8 shades. Long-lasting up to 16 hours.',
    price: 799, discountPrice: 599, category: 'Beauty',
    stock: 400, brand: 'Lakme', featured: false, tags: ['makeup', 'foundation', 'skincare'],
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500'],
    ratings: 4.2, numReviews: 890
  },
  {
    name: 'LEGO Technic Ferrari 488 GTE',
    description: 'Authentic replica of the Ferrari 488 GTE racing car. 1677 pieces with working V8 engine, independent suspension, and detailed cockpit. For ages 10+.',
    price: 14999, discountPrice: 12999, category: 'Toys',
    stock: 60, brand: 'LEGO', featured: true, tags: ['lego', 'technic', 'ferrari', 'collectible'],
    images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500'],
    ratings: 4.9, numReviews: 145
  },
  {
    name: 'boAt Rockerz 450 Bluetooth Headphones',
    description: 'On-ear wireless headphones with 15 hours playback. 40mm dynamic drivers, soft padded ear cushions, and foldable design. Compatible with Alexa.',
    price: 1999, discountPrice: 1299, category: 'Electronics',
    stock: 250, brand: 'boAt', featured: false, tags: ['headphones', 'bluetooth', 'budget'],
    images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500'],
    ratings: 4.1, numReviews: 2345
  },
  {
    name: 'Prestige Iris 750W Mixer Grinder',
    description: '3 stainless steel jars for wet grinding, dry grinding & chutney. Overload protection motor. ISI marked for safety. 5-year warranty.',
    price: 3495, discountPrice: 2799, category: 'Home & Kitchen',
    stock: 120, brand: 'Prestige', featured: false, tags: ['mixer', 'grinder', 'kitchen'],
    images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500'],
    ratings: 4.3, numReviews: 678
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
    const admin = await User.create({
      name: 'RD Shivam Admin',
      email: process.env.ADMIN_EMAIL || 'admin@rdshivam.com',
      password: adminPassword,
      role: 'admin',
      phone: '9876543210'
    });
    console.log(`✅ Admin created: ${admin.email}`);

    // Create test user
    const userPassword = await bcrypt.hash('user123', 12);
    await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: userPassword,
      role: 'user',
      phone: '9876543211',
      address: { street: 'Dashashwamedh Ghat', city: 'Varanasi', state: 'UP', pincode: '221001' }
    });
    console.log('✅ Test user created: user@test.com / user123');

    // Create products
    await Product.insertMany(products);
    console.log(`✅ ${products.length} products seeded`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('Admin: admin@rdshivam.com / admin123');
    console.log('User: user@test.com / user123');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
