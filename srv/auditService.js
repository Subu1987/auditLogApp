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
      const rawRows = XLSX.utils.sheet_to_json(sheet, { defval: null });

      // 2️⃣ Header normalization mapping
      const headerMap = {
        TIMESTAMP: "timestamp",
        HOST: "host",
        PORT: "port",
        SERVICE_NAME: "serviceName",
        CONNECTION_ID: "connectionId",
        CLIENT_HOST: "clientHost",
        CLIENT_IP: "clientIp",
        CLIENT_PID: "clientPid",
        CLIENT_PORT: "clientPort",
        USER_NAME: "userName",
        STATEMENT_USER_NAME: "statementUserName",
        APPLICATION_NAME: "applicationName",
        APPLICATION_USER_NAME: "applicationUserName",
        XS_APPLICATION_USER_NAME: "xsApplicationUserName",
        AUDIT_POLICY_NAME: "auditPolicyName",
        EVENT_STATUS: "eventStatus",
        EVENT_LEVEL: "eventLevel",
        EVENT_ACTION: "eventAction",
        SCHEMA_NAME: "schemaName",
        OBJECT_NAME: "objectName",
        PRIVILEGE_NAME: "privilegeName",
        ROLE_SCHEMA_NAME: "roleSchemaName",
        ROLE_NAME: "roleName",
        GRANTEE_SCHEMA_NAME: "granteeSchemaName",
        GRANTEE: "grantee",
        GRANTABLE: "grantable",
        FILE_NAME: "fileName",
        SECTION: "section",
        KEY: "keyText", // 🔥 'key' is reserved, map to 'keyText'
        PREV_VALUE: "prevValue",
        VALUE: "value",
        STATEMENT_STRING: "statementString",
        COMMENT: "comment",
        ORIGIN_DATABASE_NAME: "originDatabaseName",
        ORIGIN_USER_NAME: "originUserName"
      };

      // 3️⃣ Normalize each row
      const rows = rawRows.map(raw => {
        const normalized = {};
        for (const key in raw) {
          const cleanKey = key.trim(); // remove whitespace
          const mappedKey = headerMap[cleanKey];
          if (mappedKey) {
            normalized[mappedKey] = raw[key];
          }
        }
        return normalized;
      });

      // 4️⃣ Insert upload metadata
      const uploadID = cds.utils.uuid();
      await tx.run(INSERT.into("auditLogSpace.AuditUploads").entries({
        ID: uploadID,
        fileName,
        recordCount: rows.length,
        status: "SUCCESS",
        errorMessage: null
      }));

      // 5️⃣ Add upload ID to each row
      const logEntries = rows.map(row => ({
        ...row,
        ID: cds.utils.uuid(),
        upload_ID: uploadID
      }));

      // 6️⃣ Insert log records
      await tx.run(INSERT.into("auditLogSpace.AuditLogsBackup").entries(logEntries));

      return {
        status: `✅ Uploaded ${rows.length} log entries`,
        records: rows.length
      };
    } catch (err) {
      console.error("Upload failed:", err);
      return req.error(500, "Upload failed: " + err.message);
    }
  });
};
