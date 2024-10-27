import type { Metadata } from "next";
import "./globals.css";
import "react-notifications/lib/notifications.css";
import Notification from "@components/notification";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import ResponsiveDashboard from "@components/ResponsiveDashboard";
import { CookiesProvider } from "next-client-cookies/server";
import { AuthProvider } from "@context/AuthContext";
import SessionWrapper from "@components/SessionWrapper";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "JobPulse",
  description: "Stay Ahead of the Game with JobPulse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <CookiesProvider>
        <AuthProvider>
          <html lang="en">
            <head>
              <meta
                name="google-site-verification"
                content="JOyYtISfSw-gTeHkYEOFrvmnR4RU8vrW62VpBtxJ3j8"
              />
            </head>
            <body>
              <ResponsiveDashboard>
                <Notification>{children}</Notification>
              </ResponsiveDashboard>
            </body>
          </html>
        </AuthProvider>
      </CookiesProvider>
    </SessionWrapper>
  );
}
