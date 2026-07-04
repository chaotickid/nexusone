// // const os = require('os');

// // /**
// //  * Retrieves the first active, non-internal MAC address of the system.
// //  * @returns {string} The MAC address (e.g., '00:1a:2b:3c:4d:5e') or '00:00:00:00:00:00' if not found.
// //  */
// // function getHardwareMacAddress() {
// //     const networkInterfaces = os.networkInterfaces();

// //     // Iterate through all network interfaces (Ethernet, Wi-Fi, etc.)
// //     for (const interfaceName in networkInterfaces) {
// //         const interfaces = networkInterfaces[interfaceName];

// //         for (const network of interfaces) {
// //             // Filter out loopback (internal) interfaces and check for a valid MAC address
// //             if (!network.internal && network.mac && network.mac !== '00:00:00:00:00:00') {
// //                 // Returns the MAC address, usually formatted with colons or hyphens
// //                 return network.mac.toUpperCase();
// //             }
// //         }
// //     }

// //     return "00:00:00:00:00:00"; // Fallback if no valid interface is found
// // }

// // // Example usage:
// // const myMacAddress = getHardwareMacAddress();
// // console.log("System MAC Address:", myMacAddress);



// Papa.parse(csvFile, {
//     download: true,          // Important: tells PapaParse to fetch the file
//     header: true,
//     skipEmptyLines: true,

//     complete: function (result) {

//         if (result.data.length === 0) {
//             alert("CSV is empty.");
//             return;
//         }

//         createPDF(result.data);
//     },

//     error: function (err) {
//         console.error(err);
//         alert("Failed to load CSV file.");
//     }
// });

// function createPDF(data) {

//     const headers = Object.keys(data[0]);

//     const rows = data.map(row =>
//         headers.map(h => row[h])
//     );

//     const doc = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: "a4"
//     });

//     doc.setFontSize(18);
//     doc.text("Employee Report", 14, 15);

//     doc.setFontSize(10);
//     doc.text(
//         "Generated : " + new Date().toLocaleString(),
//         14,
//         22
//     );

//     doc.autoTable({
//         startY: 30,
//         head: [headers],
//         body: rows,
//         theme: "grid",

//         headStyles: {
//             fillColor: [41, 128, 185],
//             textColor: 255
//         },

//         alternateRowStyles: {
//             fillColor: [245, 245, 245]
//         },

//         styles: {
//             fontSize: 9,
//             cellPadding: 2
//         }
//     });

//     doc.save("Employee_Report.pdf");
// }