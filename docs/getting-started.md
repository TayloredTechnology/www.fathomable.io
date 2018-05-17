# Getting Started with Fathomable.io

!!! summary
		zero to hero, in the shortest time possible

At first glance, _Fathomable.io_ is simple to get up and running.

Ensuring that ongoing management; development; and releasing of inter-dependent multi-business unit applications across multiple environments stays as simple as possible.

## Essential Component Understanding

### Backend Container

… the powerhouse or central brain of the entire operation. Containers are available from [Google Container Registry](https://gcr.io/taylored-technology/fathomable).

A suitable backend container is all that's necessary to run _Fathomable.io_ in a selected backend.

<!--
### Plugin Selection

… additional plugin functionality is not required for minimal operation. For additional information on plugins and their capabilities see the relevant [plugin](./plugins.md) documentation.
-->

### REST API Authentication

… is by default handled through MultiFactorAuthentication (MFA). _Fathomable.io_ uses [Authenticator](https://www.npmjs.com/package/authenticator-cli) to handle tokens. Any MFA client can be used for token management.

## Installing on Kubernetes

… similar approaches are used for alternative backends. All relevant deployment files are available on this website, just select the versiof the backend used and apply the correct file using the appropriate backend tool.

For _Kubernetes_ v1.8.x execute the following lines.

```
kubectl apply -f https://www.fathomable.io/deploy/kubernetes/1.8.x/fathomable.yaml
```

_Fathomable.io_ has now been installed in _kube-system_ with the necessary RBAC permissions. The default MFA token is `amqk ef5z fvrn gp6q p7dg pq6g pncu ww7l`

After the _Fathomable.io_ container downloads it will take up to 90 seconds for _Fathomable.io_ to be able to operate after initial install. This is due to _Fathomable.io_'s database being synced against the _ConfigMap_ object which in most clusters refreshes every 60 seconds. _Fathomable.io_ will enter the _ready_ state when the database has been successfully verified against the _ConfigMap_

## Usage: Application Tracking

… structurally varies depending on the _Fathomable.io_ user. For the sake of minimalizm starting with the _Application Developer_ is best

_Fathomable.io_ requires two external dependencies are satisfied to manage applications.

* **Git Repo**: must contain a suitably configured _fathomable.yaml_. For this guide we are using the [singular example](https://github.com/TayloredTechnology/concourse-example-singular)
* **Container in Image Repository**: for this guide we're using https://quay.io/coreos/example-app

Once tracking is enabled, _Fathomable.io_ polls both _GitHub_ and _Container Registry_ for updates. (GitHub Rate Limiting is respected). No action is taken by _Fathomable.io_ until an update occurs on **both** _GitHub_ and the _Container Registry_. This process ensures that application configuration information and the actual application are kept in sync in deployed environments.

### Application Developer

… suggest using [httpie](https://github.com/jakubroztocil/httpie) for interacting with the API as its simpler than vanilla curl for JSON structures.

Additionally suggest using [Authenticator CLI](https://www.npmjs.com/package/authenticator-cli) as the command line companion to the _Authenticator_ module used by _Fathomable.io_ for MFA

```
# if authenticator-cli not installed run this line
npm i -g authenticator-cli

authenticator --key 'amqk ef5z fvrn gp6q p7dg pq6g pncu ww7l'
# use output of token field in above command as AUTH_CODE
# NOTE: token is only valid for a maximum of 90s and is refreshed every 30s as per MFA standards

kubectl --namespace kube-system get pods -l fathomable=httpie
# use output of above command as POD_NAME

# httpie pod is deployed as part of Fathomable.io this example
kubectl --namespace kube-system exec -ti pods/POD_NAME bash
http POST fathomable:3000/tracker mfa:AUTH_CODE id=coreos.example-app 'repo=https://github.com/TayloredTechnology/concourse-example-singular'
```

_Fathomable.io_ will now injest the _fathomable.yaml_ file in the example and update its database.

From a cluster state perspective, nothing noticible will happen at this point as a new application has been added for tracking but not deployed. Skip over the _Cluster Administrator_ guide to the _Deployment_ section now.

### Cluster Administrator

… would typically setup cluster level applications, along with the definition of what _namespace templates_ are available for _Fathomable.io_ to use. As part of this process, application tracking can also be baked in.

!!! note
		The database itself is always considered current and the ultimate source of truth. As such all setup files are **only** referenced by _Fathomable.io_ prior to the initial database creation.

The simplest method of doing this is to add another container layer to the existing backend container with the required application tracking information.

Docker is assumed to be the container builder _Dockerfile_

```
FROM gcr.io/tayloredtechnlogy/fathomable:kubernetes

COPY ./tracker.yaml /default/tracker.yaml
```

_command line_

```
# download tracker file
curl -L https://raw.githubusercontent.com/TayloredTechnology/concourse-example-singular/master/tracker.yaml -o tracker.yaml

# create a docker container with YOUR_REPO_INFORMATION
docker build -t YOUR_REPO_INFORMATION .
```

Update _Fathomable.io_ deployment information as used in the _install_ section to use the newly built container then reapply the changes.

```
# fathomable-config must be re-applied to clear the database so the newly added init files can be used
kubectl apply -f https://www.fathomable.io/deploy/kubernetes/1.8.x/fathomable-config.yaml

kubectl apply -f PATH_TO_MODIFIED/fathomable.yaml
```

## Usage: Application / Namespace Deployment

In following this guide, applications are now registered and tracked by _Fathomable.io_. New applications are not automatically deployed as _Fathomable.io_ typically manages multiple namespaces in various states of operation at any time.

Deployment of applications is handled through the `flow` API and while typically new applications would be deployed into a new _namespace_ they can be retroactively deployed using the `flow/sync` endpoint.

```
# Exec back into the httpie pod and run the following command to deploy a new namespace with the newly tracked application.
kubectl --namespace kube-system exec -ti pods/POD_NAME bash
http POST fathomable:3000/flow mfa:AUTH_CODE namespace=deux cloneFrom=dev
```

Wait a few minutes for container to download and verify that the namespace `deux` has been created and is managed by _Fathomable.io_

```
kubectl get namespaces
kubectl --namespace get configmap
kubectl --namespace deux get deployments
```

_Fathomable.io_ has created a `worker` version of itself with an independent database for managing the namespace.

Using this pattern _Fathomable.io_ will only affect namespaces that it has `workers` in, all other namespaces are ignored.
