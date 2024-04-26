import React from "react"
import jsPDF from "jspdf"

export default function Bills() {
  const generatePDF = () => {
    const doc = new jsPDF()

    doc.text("Exemple de facture", 10, 10)

    doc.save("facture.pdf")
  }

  return (
    <div>
      <button onClick={generatePDF}>Générer PDF</button>
    </div>
  )
}
