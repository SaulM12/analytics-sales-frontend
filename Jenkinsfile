pipeline {
    agent {
        docker {
            image 'node:16-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('pull') {    
            steps { 
                sh 'docker pull node:16-alpine' // Pull the image down to the agent.
            }   
        }   
        stage('docker') { // Nested stages all run on the docker agent
            agent {
                docker {
                    image "node:16-alpine" // It will find the image locally
                    reuseNode true        // important!
                }
            }
        stage('Build') {
            steps {
                sh 'npm install' 
            }
        }
    }
}