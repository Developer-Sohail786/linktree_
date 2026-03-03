// app/(navbar)/layout.js

import Navbar from "../Components/Navbar";
import Providers from "../providers";


export default function RootLayout({ children }) {
  return (

    <Providers>
      <Navbar />
      {children}
    </Providers>

  );
}