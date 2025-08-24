pipeline {
    agent any

    environment {
        // Make sure Jenkins can access Node.js, npm, and PM2
        PATH = "$PATH:/home/admin/.nvm/versions/node/v22.17.0/bin"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout from GitHub
                git branch: 'master',
                    credentialsId: 'Github-credential',
                    url: 'https://github.com/ayush462/DevopsPractise.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Deploy to EC2') {
            steps {
                // Use SSH credentials stored in Jenkins
               sshagent(credentials: ['ec2-private-key']) {
    sh '''
    ssh -o StrictHostKeyChecking=no admin@56.228.25.161 "
        export NVM_DIR=\$HOME/.nvm &&
        [ -s \$NVM_DIR/nvm.sh ] && \. \$NVM_DIR/nvm.sh &&
        cd /home/admin/DevopsPractise &&
        git pull origin master &&
        npm install &&
        pm2 restart app || pm2 start server.js --name app
    "
    '''
}
            }
        }
    }

    post {
        success {
            echo 'Deployment successful! 🚀'
        }
        failure {
            echo 'Deployment failed! ❌'
        }
    }
}
