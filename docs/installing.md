# Installing _Fathomable.io_

## Requirements

- Compatible backend container orchestrator such as Kubernetes
- Cluster Administrator access
- Firewall access to containers stored on 'Google Container Registry' (This should already be enabled in most cluster orchestration setups)

## What Occurs In Cluster

… will have slight variations in execution based on the selected orchestration backend, but the end interaction process is the same.

- _Fathomable.io_ is installed in the system namespace
- an internal endpoint is created for access
- a 'httpie' container is created for simplified manual interaction with _Fathomable.io_
- a `configMap` is created to store _Fathomable.io_'s database information.

## Kubernetes Installation

… is conducted via kubectl, and has been simplified down to a single command. {KubernetesVersion} should be replaced with 'v1.8' or the Major & Minor Version of your cluster

```
kubectl apply -f https://raw.githubusercontent.com/TayloredTechnology/www.fathomable.io/master/docs/deploy/kubernetes/v1.8/fathomable.yaml
```

!!! note
		_Fathomable.io_ is perfectly suitable to run within a 'MiniKube' environment

### Interacting with HTTPIE Pod

```
export HTTP_POD=$(kubectl get pods -n kube-system -l fathomable=httpie -o name | cut -d'/' -f2)
kubectl exec -ti -n kube-system ${HTTP_POD} bash
```

[HTTPIE Instructions](https://httpie.org/doc) can be helpful for first timers, naturally any REST compatible tool would be suitable. For example to create a _deploymentTarget_ for all applications / services governed by _Fathomable.io_

```
http POST fathomable:3000/namespace deploymentTarget=development template=dev
```

## Next Steps

… vary in complexity depending on the role inhabited within the organisation

- [Governance - Cluster - Organizational](./usage-govenor.md)
- [Developer](./usage-developer.md)
