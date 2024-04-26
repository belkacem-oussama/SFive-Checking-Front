import React from "react"
import jsPDF from "jspdf"
import SFiveLogo from "../assets/images/sfive_icone.png"

export default function Bills() {
  const generatePDF = () => {
    const doc = new jsPDF()

    // Logo SFive (hypothétique)
    const logoWidth = 50
    const logoHeight = 50
    const logoX = 10
    const logoY = 10
    // Dessiner le logo
    doc.addImage(SFiveLogo, "PNG", logoX, logoY, logoWidth, logoHeight)

    // Informations de la facture
    const reservationNumber = "Réservation #12345"
    const amount = "1000"
    const companyName = "SFive"
    const address = "6 Rue des Frères Peraux, 60180 Nogent-sur-Oise"

    // Contenu de la facture
    doc.setFontSize(12)
    doc.text(`Numéro de réservation: ${reservationNumber}`, 10, 80)
    doc.text(`Montant: ${amount} €`, 10, 90)
    doc.text(`Facturé à:`, 10, 100)
    doc.text(`${companyName}`, 15, 110)
    doc.text(`${address}`, 15, 120)

    // Sauvegarder le PDF avec un nom spécifique
    doc.save("facture_SFIVE.pdf")
  }

  return (
    <div>
      <button onClick={generatePDF}>Générer PDF</button>
    </div>
  )
}
