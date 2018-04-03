# API @ Namespaces

!!! info - **Scope:** _Fathomable.io_ - **File:** `Fathomable.io.namespaces.yaml`

## Concept

… an islation approach for integration with the backend container orchestration system in a logical, application centric methodology.

Namespaces in _Fathomable.io_ are actual 'namespaces' in the container orchestration technology and follow naming convetions allowing _Fathomable.io_ to co-exist with any other namespaces already in the cluster as only ones and starting with names described in this file will be monitoring and controlled by _Fathomable.io_

_Fathomable.io_ isn't restrictive if you desire multiple versions of a namespace. Its only necessary to inform _Fathomable.io_ of the new namespace that starts with one of your defined names and it will add and track it. i.e. dev-another or devAnother or devanother1 will all be treated as identical copies of 'dev'

The concept of flow is applied to namespaces, where each namespace should be capable of identifying all errors relevant to it, and promotion to another namespace should only happen with successful execution.

Flow is: !!! info ** dev (non-ha) -> ha -> perf -> prod {canary & stable} **

Or in more detail:

_Devlike_

* **dev:** is a non high availability environment to ensure that application meets test coverage & passes required tests.
* **ha:** is a high availability environment where two instances of the application run. Tests are executed through a load balancer, and any discovery logic would also be tested.

_ProdLike_

* **perf:** is a performance testing environment where its a replication of production, auto-scaling rules would apply.
* **prod:** is the actual production environment, the concept of _canary_ releases is supported for partially loading traffic prior to full roll-out.

## Root Structure

```
dev:
ha:
perf:
prod:
(others)
```

!!! note '~' character is used throughout this documentation where items are mandatory. You can also checkout the Fathomable.io.minimal.namespaces.yaml for the absolute minimum settings necessary

`dev`, `ha`, `perf`, `prod` are sample names following the 'flow' approach mentioned previously. You are free to use your own names for meta environments. Just add `type: ['HADEV', 'PRODLIKE']` to the namespace with the settings you want to use. If you use the default names then environments will automatically perform according to 'flow' design

For simplicity only the `dev` environment is listed in examples,

!!! info "Flow Information" _dev_

     - (non-ha)
     - (minimum resource allocation)
     - (non-liveliness probing)

    *ha @ HADEV*

     - (ha)
     - (minimum resource allocation)
     - (non-liveliness probing)

    *perf & prod @ PRODLIKE*

     - (ha)
     - (maximum resource allocation)
     - (livenessProbe for restarting failed containers)

    If HADEV & PRODLIKE are both 'true' then HADEV autoscaling rules will override PRODLIKE rules resulting in a replica of 'HA' environment but with PRODLIKE settings

## Namespace Template

Applies to all environmental types (dev, ha, perf, prod). {Custom Names can be applied}

```
dev:
  deployments: {}
  environmental: {}
  ingress: {}
  omitFromDeploy: {}
  resources: {}
  type: []
```

### deployments

```
dev:
  deployments:
    enableProfiler: false
    releaseFrequency: {}
    revisionHistoryLimit: 1
```

`enableProfiler` Is a special tag, that when defined enables profiling logic for all applications in the namespace. i.e. NewRelic or SemaText for Java applications

<!-- TODO figure how best to dynamically add / manage profiling to applications -->

<!-- TODO enable CRON schedulling -->

`releaseFrequency` follows the _Recurrence Rule Schedulling_ approach for an easy human readable description of when things should happen.

RecurrenceRule can have the following properties:

* second
* minute
* hour (24 hour clock)
* date
* month (0 = January, 11 = December)
* year
* dayOfWeek (0 = Sunday, 6 = Saturday)

Array values can be passed into each of the above to trigger multiple executions.

Ranges can also be specified using strings i.e. dayOfWeek = [0, '5-6'] will result in running the job on Sunday, Friday, Saturday

!!! note It's worth noting that the default value of a component of a recurrence rule is null (except for second, which is 0 for familiarity with cron). If we did not explicitly set minute to 0 above, the message would have instead been logged at 5:00pm, 5:01pm, 5:02pm, …, 5:59pm. Probably not what you want.

### environmental

```
dev:
  environmental:
    JAVA_OPTS: ''
    NRTAG: 'PERFORMANCE' # Used with enableProfiler to add custom tags to environments
    {any others you require}
```

Environment naming approaches don't have to follow the outline suggested here, as Environment types are controlled via variables in this part of the API. Everything under this API tag is converted to environmental variables in the deployment.

!!! note App environmental varibles take precedence over namespace ones. i.e. _App_ level variables will overwrite _Namespace_ environmental variables

### Ingress

```
dev:
  ingress:
    forceAllRoutes: false
    loadBalancer:
      istio: false
      nginx: true
      kong: false
    tls:
      cluster: false
      external: false
```

_Fathomable.io_ creates an ingress controller for every deployed namespace, this ensures that access locks down to within the namespace for security and modularity.

Choices are available of where SSL termination should occur for ingress into the cluster.

* **cluster**: SSL is terminated at NGINX or Istio
* **external**: SSL is terminated at whatever load balancing technology is available to your cloud host.

As SSL isn't necessary inside clusters, by default SSL is turned off for incomming connections.

<!-- TODO enable letsEncrypt for automatic SSL -->

`forceAllRoutes` is used to override a `PRODLIKE` environment to allow ingress routes on all applications.

At this time we only support using NGINX or Istio for Layer 7 Load Balancing with Ingress

### omitFromDeploy

```
dev:
  omitFromDeploy: # default = []
  - 'stub'
  - '*.stub'
  - 'stub.stubbed'
```

List of _Groups_ and _Apps_ within groups that will be blacklisted from deploying in this namespace.

1.  stub = the entire Group 'stub' _Group_ of _Apps_ to be blacklisted
2.  \*.stubbed = the 'stubbed' App in any Group
3.  stub.stubbed = only the 'stubbed' App in the Group 'stub'

!!! important Priority follows this order: **Group > WildCard > Named App**

### resources

```
dev:
  resources:
    container:
      defaultmax:
        cpu: 250m
        memory: 1Gi
      defaultmin:
        cpu: 100m
        memory: 1Gi
```

It is important that this is always specified in namespaces as these are the default applied container limits when not provided at application level.

If more fine-grained control is required then its possible to use the following options.

```
dev:
  resources:
    container:
      max:
       cpu: 500m
       memory: 1Gi
      min:
       cpu: 50m
       memory: 10Gi
```

### type

```
dev:
  type:
    []
```

Only necessary if your wanting to use custom names for namespaces.

add `HADEV` or `PODLIKE` for the environment you wish to replicate. Leaving blank defaults to 'Dev' type of environment
