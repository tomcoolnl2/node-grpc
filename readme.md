# learning the gRPC concept for NNodeJS MicroServices

Run ```node /server``` to run a Unary service
Run ```node /client/client``` to start a Unary service
Watch the log to see a name printed out.

## TODO

- setup proper debugging
- env
- refactor into typescript
- rebuild one ms with nestjs
- rebuild one ms to a serverless nestjs api?
- aws
- https://stackoverflow.com/questions/59407530/how-to-call-a-grpc-service-running-on-ec2-from-aws-lambda
- GraphQL? https://medium.com/@svengau/when-graphql-meets-grpc-3e9729d32e05
- monorepo

<!--
grpc_tools_node_protoc ./protos/dummy.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=`which grpc_tools_node_protoc_plugin`

grpc_tools_node_protoc ./protos/greet.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=`which grpc_tools_node_protoc_plugin`

protoc -I=. ./protos/dummy.proto 
  --js_out=import_style=commonjs,binary:./server 
  --grpc_out=./server 
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`
-->