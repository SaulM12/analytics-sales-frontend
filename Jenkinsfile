pipeline {
    agent {
    label 'docker' 
  }
  stages {
    stage('Docker node test') {
      agent {
        docker {
          // Set both label and image
          label 'docker'
          image 'node:16-alpine'
          args '--name docker-node' // list any args
        }
      }
      steps {
        // Steps run in node:7-alpine docker container on docker agent
        sh 'node --version'
      }
    }
   /*  stages {
        stage('Build') {
            steps {
                sh 'npm install' 
            }
        }
    } */
}