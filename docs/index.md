# Fathomable.io

!!! summary > Autonomic Containerization for Agnostic Pipelines

    … Self orchestration for applications on any underlying containerization infrastructure.

## Background

… _Infrastructure must be agnostic from applications_. A tight coupling between aplications and infrastructure promotes vendor lock-in and technological hurdles to optimising performance, stability and reliability of your cloud or hybrid cloud services.

_Fathomable.io_ is designed to break the paradigm and enable developers to remove all dependencies on the underlying infrastructure technology hosting and running their application.

Its a full _12 Factor_ compliant approach with the lowest impact of any deployment approach in the current containerization ecosystem.

_Fathomable.io_'s only requirement for implementation is that your applications are managed in containers. The actual container orchestration technology integration is the responsibility of _Fathomable.io_

### What it does

… provides a translation & management layer between container orchestration and _12 Factor_ App design utilising a _pull_ based approach to deployment.

It follows a methodology and implementation approach that supports Legacy to 12 Factor transitions while applying the best known and accepted deployment practices irrespective of the underlying containerization orchestration technology.

### In simpler terms

Fundamentally _Fathomable.io_ is to Deployment Pipelines what Kanban is to Agile. In Deployment Pipelines items are pushed through the pipe until they appear in production with multiple gates or gatekeepers along the path. Conductor uses a Pull approach where items are automatically progressed when ready.

Its a subtle change in logic, but empowers high quality application principles and makes 12 Factor simpler to manage while allowing rapid microservice promotion with built-in tiered risk management

## Features

* **Infrastructure agnostic**: extensible platform capable of supporting all major container orchestration technologies
* **Minimal Configuration**: single YAML file of **minimum 3 lines** needed for application understanding to manage deployment
* **Parallel**: application configuration can reside in each repository or in a separate meta repository
* **Swappable**: if you need to change a core implementation, overide with your business logic
* **Enterprise Friendly**: multi-group / organisational isolation and dependency management.
* **Extensible**: run your container orchestration the way you want, Fathomable.io can extend to understand your infrastructure rules through a plugin ecosystem
* **GIT <3**: [OneFlow](http://endoflineblog.com/oneflow-a-git-branching-model-and-workflow) (an evolved version of Git Flow & Git Trunk) optimised thoughout _DevTest_ lifecycle
* **Secure**: api interactions secured via MultiFactorAuthentication (MFA) by default
* **Backwards Compatible**: not all clusters need to run the same version of the container orchestration technology. _Fathomable.io_ understands the running version and interacts appropriately

## Supported Container Orchestrators

* Kubernetes

## High Level Usage Info

Two fundamental parts make up _Fathomable.io_:

* **container**: deploy into the container orchestration platform of choice
* **fathomable.yaml** bundled with each application or aggregated into a separate repository. Viable deployment achieved in 3 lines

Applications _tracking_ information (GitHub & Container Registry) is loaded into _Fathomable.io_.

_Namespaces_ are deployed via _Fathomable.io_ with the correct application configuration and dependency information automatically calculated.

_Fathomable.io_ watches for changes application configuration information or container images, they can automatically be updated where required.
