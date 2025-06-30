using auditLogSpace from '../db/auditSchema';

service AuditService {

  // 👤 Expose Users table
  entity Users as projection on auditLogSpace.Users;

  // 📁 Expose Uploads table
  entity AuditUploads as projection on auditLogSpace.AuditUploads;

  // 📋 Expose Logs table
  entity AuditLogsBackup as projection on auditLogSpace.AuditLogsBackup;

  // 🔧 Custom action: Upload a file
  action uploadAuditLog(file : LargeBinary) returns {
    status  : String;
    records : Integer;
  };

}
