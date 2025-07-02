sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'auditlogappui/test/integration/FirstJourney',
		'auditlogappui/test/integration/pages/AuditLogsBackupList',
		'auditlogappui/test/integration/pages/AuditLogsBackupObjectPage'
    ],
    function(JourneyRunner, opaJourney, AuditLogsBackupList, AuditLogsBackupObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('auditlogappui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheAuditLogsBackupList: AuditLogsBackupList,
					onTheAuditLogsBackupObjectPage: AuditLogsBackupObjectPage
                }
            },
            opaJourney.run
        );
    }
);