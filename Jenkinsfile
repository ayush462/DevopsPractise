pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/ayush462/DevopsPractise.git',
                    credentialsId: 'Github-credential'
            }
        }

        stage('Build') {
            steps {
                sh 'echo "Installing dependencies..."'
                sh 'npm install'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ec2-private-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no admin@56.228.25.161 '
                            cd /home/admin/DevopsPractise &&
                            git pull origin master &&
                            npm install &&
                            pm2 restart app || pm2 start server.js --name app
                        '
                    '''
                }
            }
        }
    }
}
