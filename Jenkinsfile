/* pipeline {
    agent {
        docker {
            image 'node:16-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install' 
            }
        }
    }
}
 */
 pipeline {
    agent any
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:16-alpine'
                    // Run the container on the node specified at the
                    // top-level of the Pipeline, in the same workspace,
                    // rather than on a new node entirely:
                    reuseNode true
                }
            }
            steps {
                sh 'npm install'
            }
        }
    }
}