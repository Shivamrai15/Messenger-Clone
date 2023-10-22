import "./globals.css";
import { Inter } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import ActiveStatus from "./components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Messenger |  Chat with Anyone, Anywhere",
  keywords: [
    'chat app', 'chat', 'messaging app', 'messenger', 'messaging', 'communication app', 'group chat', 'video chat', 'voice chat', 'free chat', 'secure chat', 'private chat', 'encrypted chat', 'chat with friends', 'chat with family', 'chat with strangers', 'chat for business', 'chat for work', 'chat for school', 'chat for gamers', 'chat for everyone'
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/logo.ico" sizes="any" />
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus/>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
