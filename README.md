# Learning Dapr 

## Setup

 - Using visual studio code
 - Created a dev container with Minikube in docker

## Locally using minikube 

### Install Dapr 

https://docs.dapr.io/getting-started/install-dapr-cli/

```
wget -q https://raw.githubusercontent.com/dapr/cli/master/install/install.sh -O - | /bin/bash
```

Initialize dapr on minikube
```
dapr init -k
```

### Install Redis for state store and pubsub

```

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install redis bitnami/redis --set image.tag=6.2

```

- Configure redis as components for Dapr

./components/dapr-components.yaml contains the Dapr component configuration files. Make sure redis host name is correct. Redis password will be accessed from the secret created when redis was installed. 

Apply Dapr component configs to kubernates
```
kubectl apply -f ./components/dapr-components.yaml 
```

To check

```
dapr components -k
```

should display 
  NAMESPACE  NAME        TYPE          VERSION  SCOPES  CREATED              AGE  
  default    pubsub      pubsub.redis  v1                                    1h   
  default    statestore  state.redis   v1                                    1h 



# install node 
```
sudo apt update
sudo apt install curl gnupg
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs


````
