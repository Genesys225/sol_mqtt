import React from "react";
import "../../App.css";

export default function Footer() {
  return (
    <footer className="footer mt-5 p-4 text-center bg-primary">
      Copiright &copy; {new Date().getFullYear} SOL App
    </footer>
  );
}
