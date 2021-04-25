.DEFAULT_GOAL := help
.EXPORT_ALL_VARIABLES:

## APP VARS ##
PRODUCT        ?= arch
SERVICE        ?= ddd

## GENERAL VARS ##
ENV            ?= dev
PROJECT_NAME    = $(PRODUCT)-$(ENV)-ms-$(SERVICE)
PATH_SERVICE    = /v1/$(SERVICE)
APP_DIR         = app

## INCLUDE TARGETS ##
-include makefiles/*.mk