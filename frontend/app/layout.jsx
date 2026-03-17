import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

export const metadata = {
  title: 'Công ty TNHH Nhật Trí Thành | Máy Móc Thiết Bị Công Nghiệp',
  description: 'Công ty TNHH Nhật Trí Thành chuyên cung cấp máy móc thiết bị công nghiệp, phụ tùng, dây chuyền sản xuất và nguyên vật liệu cho ngành cơ khí và luyện kim tại Việt Nam.',
  keywords: 'máy móc công nghiệp, phụ tùng, vật liệu luyện kim, vật liệu chịu lửa, Việt Nam',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
