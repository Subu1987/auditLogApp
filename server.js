const cds = require('@sap/cds');
const express = require('express');

// Start the CDS server
cds.on('bootstrap', app => {
  // ⬆️ Increase payload size to allow large Excel uploads
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
});

module.exports = cds.server;
