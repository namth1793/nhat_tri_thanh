const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Category = require('./models/Category');
const Product = require('./models/Product');

const categories = [
  {
    name: 'Machinery & Equipment',
    slug: 'machinery-equipment',
    description: 'Industrial machinery and complete equipment solutions for manufacturing and production plants.',
    image: 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=800&q=80'
  },
  {
    name: 'Spare Parts & Accessories',
    slug: 'spare-parts-accessories',
    description: 'High-quality spare parts and accessories to keep your industrial machinery running efficiently.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  },
  {
    name: 'Metallurgical Raw Materials',
    slug: 'metallurgical-raw-materials',
    description: 'Premium raw materials and supplies for metallurgical and mechanical manufacturing industries.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80'
  },
  {
    name: 'Refractory Materials',
    slug: 'refractory-materials',
    description: 'High-temperature resistant refractory materials for furnaces, kilns, and industrial heating systems.',
    image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    const createdCategories = await Category.insertMany(categories);
    console.log(`Seeded ${createdCategories.length} categories`);

    const products = [
      {
        name: 'CNC Milling Machine VMC-1060',
        category: createdCategories[0]._id,
        description: 'High-precision vertical machining center for complex industrial parts manufacturing.',
        specifications: new Map([['Power', '15 kW'], ['Spindle Speed', '8000 RPM'], ['Table Size', '1200x600mm'], ['Axis Travel', 'X:1000 Y:600 Z:600mm']]),
        images: ['https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=800&q=80']
      },
      {
        name: 'Hydraulic Press 200T',
        category: createdCategories[0]._id,
        description: 'Heavy-duty hydraulic press for metal forming, stamping, and forging operations.',
        specifications: new Map([['Force', '200 Ton'], ['Stroke', '400mm'], ['Power', '22 kW'], ['Table Size', '800x800mm']]),
        images: ['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80']
      },
      {
        name: 'Industrial Lathe Machine CW6280',
        category: createdCategories[0]._id,
        description: 'Heavy-duty engine lathe for precision turning of large industrial components.',
        specifications: new Map([['Swing Over Bed', '800mm'], ['Center Distance', '3000mm'], ['Power', '18.5 kW']]),
        images: ['https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=800&q=80']
      },
      {
        name: 'SKF Bearing Set - Deep Groove',
        category: createdCategories[1]._id,
        description: 'Premium SKF deep groove ball bearings for industrial rotating machinery and equipment.',
        specifications: new Map([['Type', 'Deep Groove Ball Bearing'], ['Standard', 'ISO 15'], ['Temperature', '-30°C to +120°C']]),
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80']
      },
      {
        name: 'Industrial Gear Set',
        category: createdCategories[1]._id,
        description: 'Precision-manufactured gear sets for power transmission in industrial machinery.',
        specifications: new Map([['Material', 'Alloy Steel 42CrMo4'], ['Heat Treatment', 'Carburized & Quenched'], ['Module', '2-20']]),
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80']
      },
      {
        name: 'Pig Iron Grade C (High Purity)',
        category: createdCategories[2]._id,
        description: 'High-quality foundry pig iron for casting, steelmaking, and metallurgical applications.',
        specifications: new Map([['Carbon', '4.0-4.5%'], ['Silicon', '1.5-2.5%'], ['Manganese', '0.5-1.0%'], ['Sulfur', '<0.05%']]),
        images: ['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80']
      },
      {
        name: 'Ferrosilicon FeSi75',
        category: createdCategories[2]._id,
        description: 'Ferrosilicon alloy used as deoxidizer and alloying element in steel and iron production.',
        specifications: new Map([['Silicon', '72-80%'], ['Iron', 'Balance'], ['Form', 'Lump / Granule'], ['Packing', '1 MT Big Bag']]),
        images: ['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80']
      },
      {
        name: 'High Alumina Brick Al2O3 70%',
        category: createdCategories[3]._id,
        description: 'High alumina refractory bricks for lining furnaces, kilns, and high-temperature reactors.',
        specifications: new Map([['Al2O3 Content', '≥70%'], ['Service Temperature', '1750°C'], ['Bulk Density', '≥2.65 g/cm³'], ['Cold Crushing Strength', '≥80 MPa']]),
        images: ['https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80']
      },
      {
        name: 'Castable Refractory Cement',
        category: createdCategories[3]._id,
        description: 'Dense castable refractory for monolithic lining of industrial furnaces and boilers.',
        specifications: new Map([['Max Service Temp', '1650°C'], ['Al2O3', '≥45%'], ['Type', 'Dense Castable'], ['Packing', '25kg bag']]),
        images: ['https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80']
      }
    ];

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
    console.log('Seed completed successfully!');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.connection.close();
  }
}

seed();