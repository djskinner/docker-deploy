#!/usr/bin/env node

var path = require('path');
var spawn = require('child_process').spawn;

var options = {
    directory: process.cwd()
}
var pkg = require(path.resolve(options.directory, 'package.json'))
var imageNameAndVersion = getImageNameAndVersion(pkg)

console.log('Docker build and push: ', imageNameAndVersion)

if (!validatePackage(pkg)) {
    console.error('Error package.json is not valid. Check the config.docker.imageName key exists');
    process.exit(1);
}

var build = handleSpawnStream(spawn('docker', ['build', '-t', imageNameAndVersion, '.']))

build.on('close', function(code) {
  if (code !== 0) {
    console.log('docker build process exited with code ', code);
  } else {
    var push = handleSpawnStream(spawn('docker', ['push', imageNameAndVersion])) 
       
    push.on('close', function(code) {
        if (code !== 0) {
            console.log('docker push process exited with code ', code);
        } else {
            console.log('Docker build and push successful.');
        }
    })
  }
});

function handleSpawnStream(spawnStream) {
    spawnStream.stdout.pipe(process.stdout)
    spawnStream.stderr.pipe(process.stderr)
    spawnStream.on('error', function(err) {
        console.error('Failed to start child process. Is Docker installed and available on PATH?');
        process.exit(1)
    })
    
    return spawnStream
}

function validatePackage(pkg) {
    return pkg && pkg.config && pkg.config.docker && pkg.config.docker.imageName
}

function getImageNameAndVersion(pkg) {
    return pkg.config.docker.imageName + ':' + pkg.version
}
