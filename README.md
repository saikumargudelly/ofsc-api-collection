# Oracle Field Service Cloud (OFSC) REST API - Postman Collection

[![Postman Collection](https://img.shields.io/badge/Postman-Collection-orange.svg)](https://www.postman.com/)
[![License](https://img.shields.io/badge/License-Educational-blue.svg)]()

A comprehensive Postman collection for Oracle Field Service Cloud (OFSC) REST APIs. This educational repository contains 150+ API endpoints organized into logical categories to help developers learn and interact with OFSC services.

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

**Collection Version:** 2.1.0 | **Last Updated:** January 2026

## ✨ Features

- **150+ API Endpoints** across 7 major categories
- **Pre-configured Environment** with 54+ variables
- **Detailed Descriptions** for key endpoints
- **Request Examples** with sample payloads
- **Basic Authentication** setup included
- **Plugin API Endpoints** for custom development

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

1. **Capacity** - Quotas, bookings, availability
2. **Collaboration** - Chats, address book
3. **Core** - Activities, resources, inventories
4. **Metadata** - Activity types, properties, plugins
5. **OAuth2** - Token management
6. **Parts Catalog** - Parts and catalog management
7. **Statistics** - Travel stats, analytics

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
