sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/infocus/auditlogappui/test/integration/FirstJourney',
		'com/infocus/auditlogappui/test/integration/pages/AuditLogsBackupList',
		'com/infocus/auditlogappui/test/integration/pages/AuditLogsBackupObjectPage'
    ],
    function(JourneyRunner, opaJourney, AuditLogsBackupList, AuditLogsBackupObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/infocus/auditlogappui') + '/index.html'
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