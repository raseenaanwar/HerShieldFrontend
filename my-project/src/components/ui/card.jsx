// src/components/ui/card.jsx
export default function Card({ children }) {
    return (
      <div className="p-4 border rounded shadow-sm">
        {children}
      </div>
    );
  }
  
  // src/components/ui/alert.jsx
  export default function Alert({ message }) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        {message}
      </div>
    );
  }
  