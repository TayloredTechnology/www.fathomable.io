# Templates YAML

!!! info
		- **Scope:** _deploymentTarget_
		- **File:** `*.template.yaml`

## Understanding

… core meta component for governance. This file describes the `template`'s available for _deploymentTarget_ to be created from. Its the highest level of inheritance for governance and configuration when deploying a collection of Service / Application / Components into a _deploymentTarget_. Specified items are inherited as low priority defaults unless overriden.

_Fathomable.io_'s configuration language is architecturally and contexturally derived from over 35 specifilized industry and academic works for providing a governance via policy meta-model that agnostically interfaces with the most complex orchestration technology while articulately able to be used in conversation.

_This file is a powerhouse behind agnostic infrastructure, and provides the most simple abstraction of deployment available today._

## Template Technology Descriptors

… are logically grouped into four meta-categories, and while the individual `template` can have any name assigned to it, the `template` must belong to a meta-category. Where each meta-catagory is based on the following `operatingEnvironment` logical progression:
**development** ⇛ **high availability development** ⇛ **performance** ⇛ **production**

### Default Template Names
**dev** (type: _development_)
	- single container availability
  - minimum resource allocation
  - probes:
	  - ready
**ha** (type: _high availability development_)
	- dual container availability
  - minimum resource allocation
  - probes:
	  - ready
**perf** (type: _performance_)
	- dual container availability
  - maximum resource allocation
	- probes:
		- ready
		- health
**prod** (type: _production_)
	- high availability
	- horizonal autoscaling
	- maximum resource allocation
	- probes:
		- ready
		- health

`template` type selection is controlled via the `operatingEnvironment` field. The following states select the `operatingEnvironment`:
- [] @ **dev** (default)
- ['DEVLIKE'] @ **dev** (alterantive for direct specification)
- ['HALIKE'] @ **ha**
- ['PRODLIKE'] @ **prod**
- ['HALIKE', 'PRODLIKE'] @ **perf**

This approach enables any number of copies or versions of _deploymentTarget_ to be deployed or updated with identical or slightly varied configuration. Additionally as the governance process is version aware, multiple versions of the Service / Application / Component can co-exist in the same _deploymentTarget_

**Fathomable.io** provides this default set of Template Technology Descriptors not to enforce direction on organisations but to assist with rapid adoption and integration with existing processes. The default Templates cover all `operatingEnvironment` types that an organization would utilize in developing and promoting an Application / Service / Component through its Continuous Delivery / Deployment lifecycle. While isolating and adding the infrastructure complexities step by step to assist with narrowing debugging focus.

When creating a _deploymentTarget_ **Fathomable.io** will deploy in parallel constrained by priority order all Services / Applications / Components relying on the container orchestration technology to confirm that each Service / Application / Component has started correctly. Should a service fail to start the failure will be reported back, otherwise a sucess response will be recieved.

## Root Structure

```
dev:
ha:
perf:
prod:
mandatory:
(others)
```
As mentioned previously any custom name can be used for a `template` except `mandatory` as its a reserved `operatingEnvironment`: All information populated in this key will be deployed into **all** _deploymentTarget_'s

Should `mandatory` be used, it follows the same structure as **Fathomable.io**'s [Service / Application / Component](./index.md) with the exception of `groups` as the `mandatory` key replaces the `group` key. As such the dedicated `group` configuration is also unavailable for `mandatory`

## Template Technology Descriptor

!!! note
		'⇛' character is used throughout this documentation where items are mandatory with respect to the parent YAML key. If not specified, then item is optional.

```
example:
  environment: {}
⇛ operatingEnvironment: []
  resource: {}
```

### environment

… structural copy of [Service / Application / Component Environment](./index.md#environment)

### operatingEnvironment

```
dev:
⇛ operatingEnvironment:
⇛   []
```

`template` type selection is controlled via the `operatingEnvironment` field. The following states select the `operatingEnvironment`:
- [] @ **dev** (default)
- ['DEVLIKE'] @ **dev** (alterantive for direct specification)
- ['HALIKE'] @ **ha**
- ['PRODLIKE'] @ **prod**
- ['HALIKE', 'PRODLIKE'] @ **perf**

### resource

… structural copy of [Service / Application / Component Resource](./index.md#resource)

