// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_calculate_pb = require('../protos/calculate_pb.js');

function serialize_calculate_CalculateRequest(arg) {
  if (!(arg instanceof protos_calculate_pb.CalculateRequest)) {
    throw new Error('Expected argument of type calculate.CalculateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculate_CalculateRequest(buffer_arg) {
  return protos_calculate_pb.CalculateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculate_CalculateResponse(arg) {
  if (!(arg instanceof protos_calculate_pb.CalculateResponse)) {
    throw new Error('Expected argument of type calculate.CalculateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculate_CalculateResponse(buffer_arg) {
  return protos_calculate_pb.CalculateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculateServiceService = exports.CalculateServiceService = {
  calculate: {
    path: '/calculate.CalculateService/Calculate',
    requestStream: false,
    responseStream: false,
    requestType: protos_calculate_pb.CalculateRequest,
    responseType: protos_calculate_pb.CalculateResponse,
    requestSerialize: serialize_calculate_CalculateRequest,
    requestDeserialize: deserialize_calculate_CalculateRequest,
    responseSerialize: serialize_calculate_CalculateResponse,
    responseDeserialize: deserialize_calculate_CalculateResponse,
  },
};

exports.CalculateServiceClient = grpc.makeGenericClientConstructor(CalculateServiceService);
// Unary API
