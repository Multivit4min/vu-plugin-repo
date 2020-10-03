About this Repository
=====================

This Repository provides a place to collect and share VeniceRCON Plugins, it is a central place to download VeniceRCON plugins. If you want to create your own repository you can clone this repository and add it in your VeniceRCON's `config.yaml`!

## repository.yaml

The `repository.yaml` will hold all downloadable plugins, the required fields per plugin are:

field       | type   | description
------------|--------|-------------------------------------------------------------
name        | string | arbitary plugin name under which the plugin gets identified
description | string | a brief description of what the plugin does
version     | string | a semantic version string of the plugin version
repository  | string | a github url to the repository of the plugins source code
commit      | string | the commit which should be downloaded