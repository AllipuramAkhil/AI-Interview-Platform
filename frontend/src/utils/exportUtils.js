import { jsPDF } from "jspdf";

// ========================================
// FORMAT VALUE
// ========================================

const formatValue = (
  value
) => {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  if (
    typeof value === "object"
  ) {
    return JSON.stringify(
      value
    );
  }

  return String(value);
};

// ========================================
// CSV EXPORT
// ========================================

export function downloadCsv(
  filename,
  rows = []
) {
  try {
    // VALIDATION

    if (
      !Array.isArray(rows) ||
      rows.length === 0
    ) {
      console.warn(
        "No data available for CSV export"
      );

      return;
    }

    // HEADERS

    const headers =
      Object.keys(
        rows[0]
      );

    // CSV ROWS

    const csvRows =
      rows.map((row) =>
        headers
          .map((header) => {
            const value =
              formatValue(
                row[
                  header
                ]
              );

            return `"${value.replace(
              /"/g,
              '""'
            )}"`;
          })
          .join(",")
      );

    // FINAL CSV CONTENT

    const csvContent = [
      headers.join(","),
      ...csvRows,
    ].join("\n");

    // CREATE FILE

    const blob =
      new Blob(
        [csvContent],
        {
          type: "text/csv;charset=utf-8;",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.setAttribute(
      "download",
      filename
    );

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    URL.revokeObjectURL(
      url
    );

    console.log(
      "CSV export successful"
    );
  } catch (error) {
    console.error(
      "CSV export failed:",
      error
    );
  }
}

// ========================================
// PDF EXPORT
// ========================================

export function downloadPdf(
  filename,
  title,
  rows = []
) {
  try {
    // VALIDATION

    if (
      !Array.isArray(rows) ||
      rows.length === 0
    ) {
      console.warn(
        "No data available for PDF export"
      );

      return;
    }

    // DOCUMENT

    const doc =
      new jsPDF({
        orientation:
          "portrait",

        unit: "pt",

        format:
          "letter",
      });

    // COLORS

    const primaryColor =
      [6, 182, 212];

    const secondaryColor =
      [148, 163, 184];

    // PAGE SETUP

    const pageWidth =
      doc.internal.pageSize.getWidth();

    const pageHeight =
      doc.internal.pageSize.getHeight();

    let y = 60;

    // ========================================
    // HEADER
    // ========================================

    doc.setFillColor(
      ...primaryColor
    );

    doc.roundedRect(
      40,
      30,
      pageWidth - 80,
      60,
      12,
      12,
      "F"
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(
      22
    );

    doc.text(
      title ||
        "Export Report",
      60,
      68
    );

    // DATE

    doc.setFontSize(
      10
    );

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      pageWidth - 220,
      68
    );

    y = 120;

    // ========================================
    // TABLE HEADER
    // ========================================

    const keys =
      Object.keys(
        rows[0]
      );

    const columnWidth =
      (pageWidth - 80) /
      keys.length;

    // HEADER BG

    doc.setFillColor(
      15,
      23,
      42
    );

    doc.roundedRect(
      40,
      y,
      pageWidth - 80,
      30,
      8,
      8,
      "F"
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(
      10
    );

    keys.forEach(
      (
        key,
        index
      ) => {
        doc.text(
          key.toUpperCase(),
          50 +
            index *
              columnWidth,
          y + 20
        );
      }
    );

    y += 45;

    // ========================================
    // ROWS
    // ========================================

    doc.setFont(
      "helvetica",
      "normal"
    );

    rows.forEach(
      (
        row,
        rowIndex
      ) => {
        // PAGE BREAK

        if (
          y >
          pageHeight - 60
        ) {
          doc.addPage();

          y = 50;
        }

        // ROW BG

        if (
          rowIndex % 2 === 0
        ) {
          doc.setFillColor(
            248,
            250,
            252
          );

          doc.roundedRect(
            40,
            y - 14,
            pageWidth - 80,
            24,
            4,
            4,
            "F"
          );
        }

        doc.setTextColor(
          ...secondaryColor
        );

        doc.setFontSize(
          9
        );

        keys.forEach(
          (
            key,
            index
          ) => {
            const value =
              formatValue(
                row[key]
              );

            const trimmed =
              value.length >
              22
                ? `${value.slice(
                    0,
                    22
                  )}...`
                : value;

            doc.text(
              trimmed,
              50 +
                index *
                  columnWidth,
              y
            );
          }
        );

        y += 26;
      }
    );

    // ========================================
    // FOOTER
    // ========================================

    const totalPages =
      doc.internal.getNumberOfPages();

    for (
      let i = 1;
      i <= totalPages;
      i++
    ) {
      doc.setPage(i);

      doc.setDrawColor(
        226,
        232,
        240
      );

      doc.line(
        40,
        pageHeight - 40,
        pageWidth - 40,
        pageHeight - 40
      );

      doc.setTextColor(
        148,
        163,
        184
      );

      doc.setFontSize(
        9
      );

      doc.text(
        "AI Interview Platform Export",
        40,
        pageHeight - 20
      );

      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - 110,
        pageHeight - 20
      );
    }

    // SAVE

    doc.save(
      filename
    );

    console.log(
      "PDF export successful"
    );
  } catch (error) {
    console.error(
      "PDF export failed:",
      error
    );
  }
}