pipeline {
    agent any

    environment {
        NODE_VERSION = "22.17.0"
        APP_DIR = "/home/admin/DevopsPractise"
        SSH_USER = "admin"
        SSH_HOST = "56.228.25.161"
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
                sshagent(credentials: ['ec2-private-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} '
                        export NVM_DIR=\$HOME/.nvm
                        [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                        [ -s "\$NVM_DIR/bash_completion" ] && . "\$NVM_DIR/bash_completion"

                        nvm use ${NODE_VERSION} || nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION}

                        cd ${APP_DIR}
                        git reset --hard
                        git pull origin master
                        npm install

                        # Ensure PM2 fully restarts
                        pm2 delete app || true
                        pm2 start server.js --name app --update-env
                    '
                    """
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
