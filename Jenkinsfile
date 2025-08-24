pipeline {
    agent any

    environment {
        // Add any environment variables you need here
        NODE_VERSION = "22.17.0"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "Installing dependencies..."
                sh 'npm install'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ec2-private-key']) { // <-- your Jenkins SSH credential ID
                    sh '''
                    ssh -o StrictHostKeyChecking=no admin@56.228.25.161 '
                        export NVM_DIR=$HOME/.nvm
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"

                        nvm use ${NODE_VERSION}

                        cd /home/admin/DevopsPractise
                        git pull origin master
                        npm install
                        pm2 restart app || pm2 start server.js --name app
                    '
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Deployment completed successfully! ✅"
        }
        failure {
            echo "Deployment failed! ❌"
        }
    }
}
