const bcrypt = require('bcryptjs');
const db = require('./database');

console.log('Seeding database...');

db.exec('DELETE FROM products');
db.exec('DELETE FROM categories');
db.exec('DELETE FROM admins');
try { db.exec("DELETE FROM sqlite_sequence WHERE name IN ('products','categories','admins')"); } catch (_) {}

// Admin
const adminPw = bcrypt.hashSync('admin123', 10);
db.prepare('INSERT INTO admins (email, password, name) VALUES (?, ?, ?)').run('admin@nhattrithanh.vn', adminPw, 'Quản trị viên');
console.log('Admin seeded: admin@nhattrithanh.vn / admin123');

// Categories
const insertCat = db.prepare(`INSERT INTO categories (name_vi, name_en, slug, description_vi, description_en, image) VALUES (?, ?, ?, ?, ?, ?)`);

const catIds = db.transaction(() => {
  const c1 = insertCat.run('Máy Móc & Thiết Bị', 'Machinery & Equipment', 'may-moc-thiet-bi',
    'Máy móc thiết bị công nghiệp nhập khẩu chính hãng cho ngành luyện kim và cơ khí.',
    'Genuine imported industrial machinery for metallurgical and mechanical industries.',
    'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=800&q=80');
  const c2 = insertCat.run('Phụ Tùng & Linh Kiện', 'Spare Parts & Accessories', 'phu-tung-linh-kien',
    'Phụ tùng, linh kiện chính hãng cho máy móc công nghiệp luyện kim và cơ khí.',
    'Genuine spare parts and accessories for industrial metallurgical and mechanical machinery.',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80');
  const c3 = insertCat.run('Nguyên Liệu Luyện Kim', 'Metallurgical Raw Materials', 'nguyen-lieu-luyen-kim',
    'Nguyên liệu luyện kim chất lượng cao cho sản xuất thép, gang đúc và hợp kim.',
    'High-quality metallurgical raw materials for steel, iron casting, and alloy production.',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80');
  const c4 = insertCat.run('Vật Liệu Chịu Lửa', 'Refractory Materials', 'vat-lieu-chiu-lua',
    'Vật liệu chịu lửa chất lượng cao, chịu nhiệt độ đến 1.800°C cho lò luyện thép.',
    'High-quality refractory materials up to 1,800°C for steel melting furnaces.',
    'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80');
  return [c1.lastInsertRowid, c2.lastInsertRowid, c3.lastInsertRowid, c4.lastInsertRowid];
})();

const [c1, c2, c3, c4] = catIds;
console.log('Categories seeded: 4');

// Products
const insertProd = db.prepare(`INSERT INTO products (name_vi, name_en, category_id, description_vi, description_en, model_spec, image, specifications) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

const seedProducts = db.transaction(() => {
  // Cat 1: Machinery
  insertProd.run('Lò luyện thép trung tần', 'Medium Frequency Steel Melting Furnace', c1, 'Lò luyện thép trung tần công suất từ 500kg đến 30 tấn, tiết kiệm điện năng.', 'Medium frequency steel melting furnace 500kg to 30 tons, energy saving.', '500kg – 30T', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', JSON.stringify({ 'Công suất': '100–5000 kW', 'Tần số': '250–2500 Hz', 'Xuất xứ': 'Trung Quốc/Nhật Bản' }));
  insertProd.run('Thiết bị đúc liên tục', 'Continuous Casting Equipment', c1, 'Thiết bị đúc liên tục phôi vuông, phôi tròn theo tiêu chuẩn quốc tế.', 'Continuous casting equipment for square and round billets to international standards.', 'Phôi vuông / tròn', 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=600&q=80', JSON.stringify({ 'Tiêu chuẩn': 'ISO/CE', 'Sản phẩm': 'Phôi 100x100 – 200x200mm' }));
  insertProd.run('Máy phay CNC 3 trục', 'CNC Milling Machine 3-Axis', c1, 'Máy phay CNC 3 trục độ chính xác cao phục vụ gia công cơ khí chính xác.', 'High-precision 3-axis CNC milling machine for precision mechanical processing.', '3 trục – ±0.01mm', 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&q=80', JSON.stringify({ 'Công suất': '15 kW', 'Tốc độ trục': '8000 RPM', 'Bàn máy': '1200x600mm' }));
  insertProd.run('Máy ép thủy lực', 'Hydraulic Press', c1, 'Máy ép thủy lực từ 50T đến 2000T phục vụ rèn dập và tạo hình kim loại.', 'Hydraulic press from 50T to 2000T for forging and metal forming.', '50T – 2000T', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', JSON.stringify({ 'Lực ép': '50–2000 Tấn', 'Hành trình': '400–1200mm' }));
  insertProd.run('Máy tiện CNC', 'CNC Lathe Machine', c1, 'Máy tiện CNC độ chính xác cao, gia công chi tiết tròn xoay cỡ lớn.', 'High-precision CNC lathe for large rotary parts.', 'Độ chính xác ±0.01mm', 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=600&q=80', JSON.stringify({ 'Đường kính quay': '800mm', 'Chiều dài': '3000mm', 'Công suất': '18.5 kW' }));
  insertProd.run('Thiết bị hàn công nghiệp', 'Industrial Welding Equipment', c1, 'Thiết bị hàn MIG, TIG, SAW cho kết cấu thép và hàn áp lực.', 'MIG, TIG, SAW welding equipment for steel structures and pressure welding.', 'MIG / TIG / SAW', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', JSON.stringify({ 'Loại': 'MIG/TIG/SAW', 'Dòng hàn': '500–1000A' }));
  insertProd.run('Máy mài phẳng & tròn', 'Surface & Cylindrical Grinder', c1, 'Máy mài phẳng và mài tròn ngoài, độ nhám bề mặt Ra ≤ 0.8μm.', 'Surface and cylindrical grinder, surface roughness Ra ≤ 0.8μm.', 'Ra ≤ 0.8μm', 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&q=80', JSON.stringify({ 'Độ nhám': 'Ra ≤ 0.8μm', 'Kích thước bàn': '600x1800mm' }));
  insertProd.run('Dây chuyền sản xuất đồng bộ', 'Complete Production Line', c1, 'Dây chuyền sản xuất đồng bộ, tư vấn thiết kế và lắp đặt trọn gói.', 'Complete production line, design consultation and turnkey installation.', 'Thiết kế theo yêu cầu', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', JSON.stringify({ 'Loại': 'Trọn gói', 'Tư vấn': 'Miễn phí' }));

  // Cat 2: Spare Parts
  insertProd.run('Linh kiện, phụ kiện lò', 'Furnace Components & Accessories', c2, 'Cuộn cảm trung tần, điện cực graphite, gạch đậy nắp lò và phụ kiện lò luyện thép.', 'Induction coils, graphite electrodes, furnace lid bricks and accessories for steel melting furnaces.', 'Cuộn cảm / Điện cực', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', JSON.stringify({ 'Vật liệu': 'Đồng / Graphite / Chịu lửa', 'Ứng dụng': 'Lò trung tần, lò hồ quang' }));
  insertProd.run('Phụ tùng máy đúc', 'Casting Machine Spare Parts', c2, 'Con lăn đúc liên tục, tấm khuôn đồng, hệ thống làm mát thứ cấp.', 'Continuous casting rollers, copper mold plates, secondary cooling systems.', 'Con lăn / Khuôn đồng', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', JSON.stringify({ 'Vật liệu khuôn': 'Đồng crôm zirconi', 'Tiêu chuẩn': 'ISO' }));
  insertProd.run('Phụ tùng máy cắt', 'Cutting Machine Spare Parts', c2, 'Lưỡi cắt thép, dao phay hợp kim, mũi khoan HSS và carbide.', 'Steel cutting blades, carbide milling cutters, HSS and carbide drill bits.', 'Lưỡi cắt / Dao phay', 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&q=80', JSON.stringify({ 'Vật liệu': 'HSS / Carbide', 'Tiêu chuẩn': 'DIN/ISO' }));
  insertProd.run('Vòng bi SKF / FAG / NSK', 'Bearings SKF / FAG / NSK', c2, 'Vòng bi chính hãng các thương hiệu SKF, FAG, NSK — các cỡ tiêu chuẩn.', 'Genuine bearings: SKF, FAG, NSK — all standard sizes available.', 'Các cỡ theo tiêu chuẩn', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', JSON.stringify({ 'Thương hiệu': 'SKF / FAG / NSK', 'Tiêu chuẩn': 'ISO 15' }));
  insertProd.run('Bộ bánh răng & hộp số', 'Gear Sets & Gearboxes', c2, 'Bánh răng và hộp số thép hợp kim 42CrMo4, nhiệt luyện tôi thấm cacbon.', 'Gear sets and gearboxes in 42CrMo4 alloy steel, carburized and quenched.', 'Thép hợp kim 42CrMo4', 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=600&q=80', JSON.stringify({ 'Vật liệu': 'Thép 42CrMo4', 'Nhiệt luyện': 'Tôi thấm cacbon' }));
  insertProd.run('Linh kiện thủy lực', 'Hydraulic Components', c2, 'Van thủy lực, bơm thủy lực, xylanh thủy lực cho máy ép và máy cán.', 'Hydraulic valves, pumps, cylinders for presses and rolling mills.', 'Van / Bơm / Xylanh', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', JSON.stringify({ 'Áp suất': '160–350 bar', 'Thương hiệu': 'Bosch / Parker / Rexroth' }));

  // Cat 3: Metallurgical Materials
  insertProd.run('Ferosilicon FeSi75', 'Ferrosilicon FeSi75', c3, 'Ferosilicon dùng làm chất khử oxy và hợp kim hóa trong luyện thép và đúc gang.', 'Ferrosilicon used as deoxidizer and alloying agent in steelmaking and iron casting.', 'Si: 72-80%', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', JSON.stringify({ 'Si': '72-80%', 'Dạng': 'Cục / Hạt', 'Đóng gói': 'Big bag 1MT' }));
  insertProd.run('Sica dạng cục (SiC)', 'Silicon Carbide Lump (SiC)', c3, 'Sica dạng cục dùng tăng cacbon và khử oxy trong luyện thép và đúc gang.', 'Silicon carbide lump for carbon raising and deoxidation in steelmaking.', 'SiC ≥ 90%', 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&q=80', JSON.stringify({ 'SiC': '≥ 90%', 'Dạng': 'Cục 10-100mm', 'Đóng gói': 'Bao 25kg / Big bag' }));
  insertProd.run('SiCaBa', 'SiCaBa Alloy', c3, 'Hợp kim Si-Ca-Ba dùng làm chất biến tính và khử oxy hiệu quả cao trong luyện thép.', 'Si-Ca-Ba alloy used as inoculant and high-efficiency deoxidizer in steelmaking.', 'Si+Ca+Ba hợp kim', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', JSON.stringify({ 'Si': '55-65%', 'Ca': '8-15%', 'Ba': '10-18%' }));
  insertProd.run('Chất gom xỉ', 'Slag Coagulant', c3, 'Chất gom xỉ giảm thiểu thất thoát kim loại, cải thiện chất lượng xỉ trong luyện thép.', 'Slag coagulant to reduce metal losses and improve slag quality in steelmaking.', 'Dạng bột / hạt', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', JSON.stringify({ 'Dạng': 'Bột / Hạt', 'Đóng gói': 'Bao 25kg' }));
  insertProd.run('Cát dẫn dòng', 'Tundish Filler Sand', c3, 'Cát thạch anh chuyên dụng cho hệ thống dẫn dòng thùng rót trong đúc liên tục.', 'High-purity quartz sand for tundish nozzle filling in continuous casting.', 'SiO₂ ≥ 95%', 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=600&q=80', JSON.stringify({ 'SiO₂': '≥ 95%', 'Độ hạt': '0.2-1.0mm', 'Đóng gói': 'Bao 25kg' }));
  insertProd.run('Vật liệu tăng cacbon', 'Carbon Raiser', c3, 'Than coke và than điện cực dạng hạt tinh khiết cao dùng tăng cacbon trong luyện thép.', 'High-purity coke and graphite electrode granules for carbon raising in steelmaking.', 'C ≥ 98%, S ≤ 0.05%', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', JSON.stringify({ 'C': '≥ 98%', 'S': '≤ 0.05%', 'Loại': 'Than coke / Than điện cực' }));
  insertProd.run('Gang thỏi đúc', 'Foundry Pig Iron', c3, 'Gang thỏi đúc chất lượng cao cho đúc gang xám, gang cầu và các hợp kim đặc biệt.', 'High-quality foundry pig iron for gray iron, ductile iron casting.', 'C: 4.0-4.5%', 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&q=80', JSON.stringify({ 'C': '4.0-4.5%', 'Si': '1.5-2.5%', 'Mn': '0.5-1.0%' }));
  insertProd.run('Feromangan FeMn', 'Ferromanganese FeMn', c3, 'Feromangan hàm lượng Mn 65-80%, dùng khử oxy và hợp kim hóa mangan cho thép.', 'Ferromanganese with Mn 65-80%, used for deoxidation and manganese alloying of steel.', 'Mn: 65-80%', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', JSON.stringify({ 'Mn': '65-80%', 'C': '≤ 7.5%', 'Dạng': 'Cục' }));

  // Cat 4: Refractory
  insertProd.run('Gạch cao nhôm Al₂O₃ 70%', 'High Alumina Brick Al₂O₃ 70%', c4, 'Gạch cao nhôm hàm lượng Al₂O₃ ≥70%, chịu nhiệt đến 1750°C cho lò luyện thép.', 'High alumina brick with Al₂O₃ ≥70%, heat resistant up to 1750°C for steel furnaces.', 'T ≤ 1.750°C', 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&q=80', JSON.stringify({ 'Al₂O₃': '≥ 70%', 'T sử dụng': '1750°C', 'Khối lượng riêng': '≥ 2.65 g/cm³' }));
  insertProd.run('Gạch silic SiO₂', 'Silica Brick', c4, 'Gạch silic SiO₂ ≥93% cho mái lò hồ quang và lò nung thủy tinh.', 'Silica brick SiO₂ ≥93% for electric arc furnace roofs and glass kilns.', 'SiO₂ ≥ 93%', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', JSON.stringify({ 'SiO₂': '≥ 93%', 'T sử dụng': '1650°C' }));
  insertProd.run('Gạch magiê MgO', 'Magnesia Brick', c4, 'Gạch magiê MgO ≥85% chịu xỉ bazơ, dùng cho lò thổi BOF và lò điện EAF.', 'Magnesia brick MgO ≥85%, slag resistant, for BOF and EAF furnaces.', 'MgO ≥ 85%', 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=600&q=80', JSON.stringify({ 'MgO': '≥ 85%', 'T sử dụng': '1800°C', 'Ứng dụng': 'BOF / EAF' }));
  insertProd.run('VL chịu lửa định hình', 'Shaped Refractory Products', c4, 'Vật liệu chịu lửa định hình theo hình dạng kết cấu lò, đúc sẵn theo bản vẽ.', 'Shaped refractory products precast to furnace geometry according to drawings.', 'Đúc theo bản vẽ', 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&q=80', JSON.stringify({ 'Loại': 'Đúc sẵn theo yêu cầu', 'Al₂O₃': '40-85%' }));
  insertProd.run('Bê tông chịu lửa đúc', 'Castable Refractory', c4, 'Bê tông chịu lửa đổ tại chỗ, chịu nhiệt đến 1650°C, cho lò nung và lò xi măng.', 'Castable refractory for in-situ casting, up to 1650°C, for kilns and cement rotary kilns.', 'T ≤ 1.650°C', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', JSON.stringify({ 'Al₂O₃': '≥ 45%', 'T sử dụng': '1650°C', 'Đóng gói': 'Bao 25kg' }));
  insertProd.run('Vữa chịu lửa', 'Refractory Mortar', c4, 'Vữa chịu lửa dùng xây gạch lò, chịu nhiệt độ cao và ăn mòn hóa học.', 'Refractory mortar for brick laying, resistant to high temperature and chemical attack.', 'Dùng xây gạch lò', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', JSON.stringify({ 'Loại': 'Vữa aluminosilicat', 'T': 'Đến 1700°C' }));
  insertProd.run('Bông gốm cách nhiệt', 'Ceramic Fiber Blanket', c4, 'Bông gốm cách nhiệt chịu nhiệt 1260°C, dùng lót lò, cách nhiệt đường ống.', 'Ceramic fiber blanket, 1260°C rating, for furnace lining and pipe insulation.', 'T ≤ 1.260°C', 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&q=80', JSON.stringify({ 'T sử dụng': '1260°C', 'Mật độ': '96-128 kg/m³' }));
  insertProd.run('Gạch cách nhiệt nhẹ', 'Lightweight Insulation Brick', c4, 'Gạch cách nhiệt nhẹ khối lượng riêng thấp, tiết kiệm năng lượng cho lò nung.', 'Lightweight insulation brick with low density, energy saving for kilns.', 'D: 0.6 – 1.0 g/cm³', 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=600&q=80', JSON.stringify({ 'Khối lượng riêng': '0.6-1.0 g/cm³', 'T sử dụng': 'Đến 1400°C' }));
});

seedProducts();
console.log('Products seeded: 30');
console.log('Seed completed!');
