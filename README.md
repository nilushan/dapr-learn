# Learning Dapr 

## Setup

 - Using visual studio code
 - Created a dev container running ubuntu

## Locally using minikube 

### install minikube
 in dev container install curl, minikube and dapr 

https://minikube.sigs.k8s.io/docs/start/


 ```
"postCreateCommand": "sudo apt-get update && sudo apt-get install -y curl && curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64 && 
sudo wget -q https://raw.githubusercontent.com/dapr/cli/master/install/install.sh -O - | /bin/bash
",
 ```

start minikube after dev container is started

```
"postStartCommand": "minikube start"

```

