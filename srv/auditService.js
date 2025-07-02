const XLSX = require("xlsx");
const cds = require("@sap/cds");

module.exports = srv => {
  srv.on("uploadAuditLog", async req => {
    const { fileName, file } = req.data;
    const tx = cds.transaction(req);

    try {
      // 1️⃣ Decode base64 Excel
      const buffer = Buffer.from(file, "base64");
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

      // 2️⃣ Create an AuditUploads entry
      const uploadID = cds.utils.uuid();
      const uploadRecord = {
        ID: uploadID,
        fileName,
        recordCount: rows.length,
        status: 'SUCCESS',
        errorMessage: null
      };

      await tx.run(INSERT.into("auditLogSpace.AuditUploads").entries(uploadRecord));

      // 3️⃣ Prepare AuditLogsBackup entries
      const logEntries = rows.map(row => ({
        ...row,                        // take Excel columns directly
        ID: cds.utils.uuid(),
        upload_ID: uploadID           // foreign key to AuditUploads
      }));

      // 4️⃣ Insert all log entries
      await tx.run(INSERT.into("auditLogSpace.AuditLogsBackup").entries(logEntries));

      return {
        status: `✅ Uploaded ${rows.length} log entries`,
        records: rows.length
      };

    } catch (err) {
      console.error("Upload failed:", err.message);
      return req.error(500, "Upload failed: " + err.message);
    }
  });
};
