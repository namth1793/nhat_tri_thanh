const db = require('./database');

console.log('Seeding database...');

// Clear existing data
db.exec('DELETE FROM products');
db.exec('DELETE FROM categories');
try { db.exec("DELETE FROM sqlite_sequence WHERE name IN ('products','categories')"); } catch (_) {}

// Seed categories
const insertCategory = db.prepare(
  'INSERT INTO categories (name, slug, description, image) VALUES (?, ?, ?, ?)'
);

const cats = db.transaction(() => {
  const c1 = insertCategory.run(
    'Machinery & Equipment',
    'machinery-equipment',
    'Industrial machinery and complete equipment solutions for manufacturing and production plants.',
    'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=800&q=80'
  );
  const c2 = insertCategory.run(
    'Spare Parts & Accessories',
    'spare-parts-accessories',
    'High-quality spare parts and accessories to keep your industrial machinery running efficiently.',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  );
  const c3 = insertCategory.run(
    'Metallurgical Raw Materials',
    'metallurgical-raw-materials',
    'Premium raw materials and supplies for metallurgical and mechanical manufacturing industries.',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80'
  );
  const c4 = insertCategory.run(
    'Refractory Materials',
    'refractory-materials',
    'High-temperature resistant refractory materials for furnaces, kilns, and industrial heating systems.',
    'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80'
  );
  return [c1.lastInsertRowid, c2.lastInsertRowid, c3.lastInsertRowid, c4.lastInsertRowid];
});

const [c1id, c2id, c3id, c4id] = cats();
console.log('Categories seeded: 4');

// Seed products
const insertProduct = db.prepare(
  'INSERT INTO products (name, category_id, description, specifications, images) VALUES (?, ?, ?, ?, ?)'
);

const products = db.transaction(() => {
  insertProduct.run(
    'CNC Milling Machine VMC-1060', c1id,
    'High-precision vertical machining center for complex industrial parts manufacturing.',
    JSON.stringify({ Power: '15 kW', 'Spindle Speed': '8000 RPM', 'Table Size': '1200x600mm', 'Axis Travel': 'X:1000 Y:600 Z:600mm' }),
    JSON.stringify(['https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=800&q=80'])
  );
  insertProduct.run(
    'Hydraulic Press 200T', c1id,
    'Heavy-duty hydraulic press for metal forming, stamping, and forging operations.',
    JSON.stringify({ Force: '200 Ton', Stroke: '400mm', Power: '22 kW', 'Table Size': '800x800mm' }),
    JSON.stringify(['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80'])
  );
  insertProduct.run(
    'Industrial Lathe Machine CW6280', c1id,
    'Heavy-duty engine lathe for precision turning of large industrial components.',
    JSON.stringify({ 'Swing Over Bed': '800mm', 'Center Distance': '3000mm', Power: '18.5 kW' }),
    JSON.stringify(['https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=800&q=80'])
  );
  insertProduct.run(
    'SKF Bearing Set - Deep Groove', c2id,
    'Premium SKF deep groove ball bearings for industrial rotating machinery and equipment.',
    JSON.stringify({ Type: 'Deep Groove Ball Bearing', Standard: 'ISO 15', Temperature: '-30°C to +120°C' }),
    JSON.stringify(['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'])
  );
  insertProduct.run(
    'Industrial Gear Set', c2id,
    'Precision-manufactured gear sets for power transmission in industrial machinery.',
    JSON.stringify({ Material: 'Alloy Steel 42CrMo4', 'Heat Treatment': 'Carburized & Quenched', Module: '2-20' }),
    JSON.stringify(['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'])
  );
  insertProduct.run(
    'Pig Iron Grade C (High Purity)', c3id,
    'High-quality foundry pig iron for casting, steelmaking, and metallurgical applications.',
    JSON.stringify({ Carbon: '4.0-4.5%', Silicon: '1.5-2.5%', Manganese: '0.5-1.0%', Sulfur: '<0.05%' }),
    JSON.stringify(['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80'])
  );
  insertProduct.run(
    'Ferrosilicon FeSi75', c3id,
    'Ferrosilicon alloy used as deoxidizer and alloying element in steel and iron production.',
    JSON.stringify({ Silicon: '72-80%', Iron: 'Balance', Form: 'Lump / Granule', Packing: '1 MT Big Bag' }),
    JSON.stringify(['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80'])
  );
  insertProduct.run(
    'High Alumina Brick Al2O3 70%', c4id,
    'High alumina refractory bricks for lining furnaces, kilns, and high-temperature reactors.',
    JSON.stringify({ 'Al2O3 Content': '≥70%', 'Service Temperature': '1750°C', 'Bulk Density': '≥2.65 g/cm³', 'Cold Crushing Strength': '≥80 MPa' }),
    JSON.stringify(['https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80'])
  );
  insertProduct.run(
    'Castable Refractory Cement', c4id,
    'Dense castable refractory for monolithic lining of industrial furnaces and boilers.',
    JSON.stringify({ 'Max Service Temp': '1650°C', Al2O3: '≥45%', Type: 'Dense Castable', Packing: '25kg bag' }),
    JSON.stringify(['https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80'])
  );
});

products();
console.log('Products seeded: 9');
console.log('Seed completed!');
