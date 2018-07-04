LABEL: INFRASTRUCTURE for Fathomable controlled?

# Fathomable Services
Controls Namespace / Deployment Target (cloneFrom)
- ApiGateWay (per Namespace)
	- Implements CircuitBreaker Logic
- AuditingServices (per Namespace & independent of cluster auditing)
- Load Balancing
- Monitoring Services (upgraded to Cluster level)
- Security Services (Network & Backend API)
-

## Apps
exampleGroup (appNamespace)
  exampleApp: (TechnologyDescriptor)
    availability: _ha_ && _probes_ && _terminationGracePeriodSeconds_
		circuitBreaker: {}
		commandLineInterface:
			command:
			argument: _args_
		component: (app sub-namespace)
		daemon: true
		endpoint: _ingress_ (converted format)
			domain:
				- xyz.com
			provide: (interfaces attached to endpoints)
				'/something/':
			require: _depends_
				(can consume own interfaces from different versions)
		environment:
			file:
				config: _config_
				secret: _secrets_
			variable: _environment_
    label: {}
		layer: 'base'
		repository: _vetos_
    resource: {}
		security:
			account: _serviceAccount_
    stateful: {}
    version: _imageTag_

exampleGroup:
  group:
		environent:
			file:
				config: _config_
				secret: _secrets_
			variable: _environment_
		repository:
			image:
				auth: _authRepository_
				owner: _containerOwner_
				domain: _containerRepository_
		security:
			account: _serviceAccount_

template:

example:
  environment: _environmental_
  resource: _resources_
  operatingEnvironmen: _type_



## Group

## Deployment Target Templates

Mandatory tools
(ALL)
- skipper for ingress
- function ingress framework
(DEVELOPMENT)
- pact broker as independent contract verifier


