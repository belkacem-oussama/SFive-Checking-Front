import React from "react"
import jsPDF from "jspdf"
import "jspdf-autotable"
import SFiveLogo from "../assets/images/sfive_icone.png"

export default function Bills() {
  const generatePDF = () => {
    const doc = new jsPDF()

    // Logo SFive
    const logoWidth = 50
    const logoHeight = 50
    const logoX = 10
    const logoY = 10
    doc.addImage(SFiveLogo, "PNG", logoX, logoY, logoWidth, logoHeight)

    // Informations de l'entreprise
    const companyName = "S-FIVE5"
    const companyAddress = "6 rue des Frères Péraux"
    const companyCity = "60180 Nogent-sur-Oise"
    const companyPhone = "03 65 09 03 90"
    const companyEmail = "infosfives@gmail.com"

    // Position des informations de l'entreprise sous le logo
    const companyInfoY = logoY + logoHeight + 10
    doc.text(`${companyName}`, logoX, companyInfoY)
    doc.text(`${companyAddress}`, logoX, companyInfoY + 10)
    doc.text(`${companyCity}`, logoX, companyInfoY + 20)
    doc.text(`Tél: ${companyPhone}`, logoX, companyInfoY + 30)
    doc.text(`Email: ${companyEmail}`, logoX, companyInfoY + 40)

    // Titre de la facture
    const invoiceTitle = "Facture SFIVES"
    doc.text(`${invoiceTitle}`, 10, companyInfoY + 60)

    // Informations sur la facture
    const invoiceDate = "Le 18 février 2023" // Date au format français
    const invoiceNumber = "Facture 180223"
    doc.text(`${invoiceDate}`, 150, companyInfoY + 10) // Date à droite
    doc.text(`Client: Apprentis d’auteuil`, 150, companyInfoY + 20) // Client
    doc.text(`Lieu de facturation: Nogent-sur-Oise`, 150, companyInfoY + 30) // Lieu de facturation

    // Objet de la facture
    doc.text("Objet: facture SFIVE5", 10, companyInfoY + 80)

    // Tableau des articles
    const items = [
      {
        description: "2h",
        unitPriceTTC: "120€",
        totalPriceHT: "100€",
        totalPriceTTC: "120€",
      },
    ]

    const tableColumns = [
      "Quantité",
      "Prix unitaire TTC",
      "Prix total HT",
      "Prix total TTC",
    ]
    const tableRows = items.map((item) => [
      item.description,
      item.unitPriceTTC,
      item.totalPriceHT,
      item.totalPriceTTC,
    ])

    doc.autoTable({
      startY: companyInfoY + 100,
      head: [tableColumns],
      body: tableRows,
    })

    // Total à régler
    const totalAmountTTC = "120€"
    doc.text(
      `Total à régler: ${totalAmountTTC}`,
      10,
      doc.autoTable.previous.finalY + 10
    )

    // Message de conclusion
    doc.text(
      "Nous restons à votre disposition pour toute information complémentaire.",
      10,
      doc.autoTable.previous.finalY + 20
    )
    doc.text("Cordialement,", 10, doc.autoTable.previous.finalY + 30)

    // SIRET / N° TVA centré en bas
    const companyInfoBottomY = doc.internal.pageSize.height - 30
    doc.text(
      "N° SIRET : 84937789000017 / N° TVA : FR 39849377890",
      0,
      companyInfoBottomY,
      { align: "center" }
    )

    // Sauvegarder le PDF avec un nom spécifique
    doc.save("facture_SFIVE5.pdf")
  }

  return (
    <div>
      <button onClick={generatePDF}>Générer PDF</button>
    </div>
  )
}
