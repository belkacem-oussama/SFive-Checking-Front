import React from "react"
import jsPDF from "jspdf"
import "jspdf-autotable"
import SFiveLogo from "../assets/images/sfive_icone.png"

export default function Bills() {
  const generatePDF = () => {
    const doc = new jsPDF()

    // Logo SFive
    const logoWidth = 40
    const logoHeight = 30
    const logoX = 10
    const logoY = 10
    doc.addImage(SFiveLogo, "PNG", logoX, logoY, logoWidth, logoHeight)

    // Informations de l'entreprise
    const companyName = "S-FIVE5"
    const companyAddress = "6 Rue des Frères Péraux"
    const companyCity = "60180 Nogent-sur-Oise"
    const companyPhone = "03 65 09 03 90"
    const companyEmail = "infosfives@gmail.com"

    const customerName = "Apprentis d’auteuil"
    const billsLocation = "À Nogent-Sur-Oise"

    // Entreprise ------------------------------------
    const companyInfoY = logoY + logoHeight + 5

    // Définir la taille de police pour les informations de l'entreprise
    const infoFontSize = 12

    doc.setFontSize(infoFontSize)
    doc.text(`${companyName}`, 20, companyInfoY)
    doc.text(`${companyAddress}`, logoX, companyInfoY + 5)
    doc.text(`${companyCity}`, logoX, companyInfoY + 10)
    doc.text(`${companyPhone}`, logoX, companyInfoY + 15)
    doc.text(`${companyEmail}`, logoX, companyInfoY + 20)

    // Informations sur la facture
    const invoiceDate = "Le 18 Février 2023"
    const invoiceNumber = "180223"

    // Client ------------------------------------
    const clientInfoX = 150
    const clientInfoY = companyInfoY + 30
    doc.text(`${customerName}`, clientInfoX, clientInfoY)

    // Date et lieu de facturation ----------------------
    const billingInfoY = clientInfoY + 10
    doc.text(`${invoiceDate}`, clientInfoX, billingInfoY)
    doc.text(`${billsLocation}`, clientInfoX, billingInfoY + 5)

    // Objet de la facture -----------------------------
    const invoiceObjectY = billingInfoY + 20
    doc.text("Objet : Facture SFIVE5", 10, invoiceObjectY)

    // Position numéro facture -------------------------
    doc.text(`Facture ${invoiceNumber}`, 80, invoiceObjectY + 20)

    // Tableau des articles -----------------------------
    const items = [
      {
        description: "2 heures",
        totalPriceHT: "100€",
        totalPriceTTC: "120€",
        totalPay: "120€",
      },
    ]

    // Définition des colonnes et lignes du tableau
    const tableColumns = [
      { header: "Quantité", dataKey: "description" },
      { header: "Prix Total HT", dataKey: "totalPriceHT" },
      { header: "Prix Total TTC", dataKey: "totalPriceTTC" },
      { header: "À Régler", dataKey: "totalPay" },
    ]

    const tableY = invoiceObjectY + 30 // Position Y pour le tableau des articles

    doc.autoTable({
      startY: tableY,
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: { fontSize: 14 },
      columnStyles: { 0: { cellWidth: 60 } },
      body: items,
      columns: tableColumns,
      didParseCell: function (data) {
        if (
          data.column.dataKey === "totalPay" &&
          data.cell.section === "body"
        ) {
          data.cell.styles.fontStyle = "bold"
          data.cell.text = `${data.cell.text}`
        }
      },
    })

    // Message  ------------------------------------
    const totalAmountY = doc.autoTable.previous.finalY + 10
    doc.text(
      "Nous restons à votre disposition pour toute information complémentaire.",
      13,
      totalAmountY + 5
    )
    doc.text("Cordialement,", 13, totalAmountY + 10)
    doc.text("L'équipe S-FIVE5", 13, totalAmountY + 15)

    // SIRET / N° TVA -----------------------------------
    const companyInfoBottomY = doc.internal.pageSize.height - 30

    doc.setFont("helvetica", "bold")
    doc.text(
      "N° SIRET : 84937789000017 / N° TVA : FR 39849377890",
      35,
      companyInfoBottomY
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
