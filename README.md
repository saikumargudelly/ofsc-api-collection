# Oracle Field Service Cloud (OFSC) REST API - Postman Collection

[![Postman Collection](https://img.shields.io/badge/Postman-Collection-orange.svg)](https://www.postman.com/)
[![License](https://img.shields.io/badge/License-Educational-blue.svg)]()

A comprehensive Postman collection for Oracle Field Service Cloud (OFSC) REST APIs. This educational repository contains **253+ API endpoints** (260 total requests) providing 100% complete coverage of all official Oracle Field Service REST API endpoints, organized into logical categories to help developers learn and interact with OFSC services.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Categories](#api-categories)
- [Usage Examples](#usage-examples)
- [Plugin Development](#plugin-development)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [Resources](#resources)

## 🎯 Overview

Oracle Field Service Cloud (OFSC) is a comprehensive field service management solution. This Postman collection provides a complete reference for the OFSC REST API, covering all major functional areas.

**Release:** Oracle Fusion Field Service 26D | **API Spec Version:** 2026.07.29 | **Last Updated:** October 2026

## ✨ Features

- **253+ Official REST Endpoints** (260 requests) with 100% API coverage
- **Pre-configured Environment** with 58+ variables
- **Detailed Descriptions** for all endpoints from official Oracle specifications
- **Request Examples** with valid sample JSON payloads
- **Basic Authentication & OAuth2** setup included
- **Plugin API Endpoints** for custom development
- **Full Coverage of Modern APIs:** Shifts, Link Templates, Activity Type Groups, Routing Runs & v2 Plans, and External Files Info

## 🚀 Installation

```bash
git clone https://github.com/saikumargudelly/ofsc-api-postman-collection.git
```

Then import the JSON files into Postman.

## ⚙️ Configuration

Update these variables in your Postman environment:

| Variable | Description |
|----------|-------------|
| `base_url` | Your OFSC instance URL |
| `username` | OFSC API username |
| `password` | OFSC API password/key |

## 📚 API Categories

1. **Capacity** - Quotas (v1 & v2), bookings, available capacity, booking fields dependencies
2. **Collaboration** - Chats, address book
3. **Core** - Activities, resources, inventories, external file attachments, service requests, events, daily extracts, users
4. **Metadata** - Activity types, activity type groups, properties, plugins, link templates, shifts, routing profiles & plans, capacity areas, work skills, work zones
5. **Routing** - Routing profiles, routing runs & reports, routing plan import/export (v1 & v2)
6. **OAuth2** - Token management (v1 & RFC 6749 compliant v2)
7. **Parts Catalog** - Parts and catalog management
8. **Statistics** - Travel stats, activity duration, airline distance analytics

## 💡 Usage Examples

```http
# Get an activity
GET {{base_url}}/rest/ofscCore/v1/activities/{{activityId}}

# Create an activity
POST {{base_url}}/rest/ofscCore/v1/activities
{
  "activityType": "INSTALL",
  "date": "2026-02-01",
  "duration": 60
}
```

## 🔌 Plugin Development

Want to develop OFSC plugins efficiently from VS Code?

👉 **[OFSC Plugin Tools](https://github.com/saikumargudelly/ofsc-plugin-tools)**

Features:
- One-click deployment (`Cmd+Shift+B`)
- Auto-deploy on file changes
- Plugin validation
- Complete workflow automation

### Plugin Endpoints

This collection includes:
- `POST /rest/ofscMetadata/v1/plugins/custom-actions/import` - Import custom plugins
- `POST /rest/ofscMetadata/v1/plugins/{pluginLabel}/custom-actions/install` - Install standard plugins

## 🔑 Environment Variables

The collection uses 54+ variables including: `activityId`, `resourceId`, `inventoryId`, `workSkill`, `workZone`, and more.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Add your changes with descriptions
4. Submit a Pull Request

## 📚 Resources

- [Oracle OFSC Documentation](https://docs.oracle.com/en/cloud/saas/field-service/)
- [OFSC REST API Reference](https://docs.oracle.com/en/cloud/saas/field-service/rest-api/)
- [OFSC Plugin Tools](https://github.com/saikumargudelly/ofsc-plugin-tools)

---

**Made with ❤️ for the OFSC Developer Community**

*This is an educational resource and is not officially maintained by Oracle.*
