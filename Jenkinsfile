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

pipeline {
    agent any
    
    environment {
        registry = "035574589515.dkr.ecr.us-east-2.amazonaws.com/yudeng_jenkins"
    }

    
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/TirTir/ToDoList']])
            }
        }
        
        stage("Build") {
            steps {
                dir('/var/lib/jenkins/workspace/jenkins/to-do-list') {
                    sh 'npm install'
                    sh 'npm run build'
                }
        
                dir('/var/lib/jenkins/workspace/jenkins/db-server') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage("Build Image") {
            steps {
                script {
                    sh '''
                        docker build -t 035574589515.dkr.ecr.us-east-2.amazonaws.com/yudeng_jenkins:$BUILD_NUMBER .
                    '''
                }
            }
        }
        
        stage("Push Image to ECR") {
            steps {
                script {
                    sh '''
                        aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 035574589515.dkr.ecr.us-east-2.amazonaws.com
                        docker push 035574589515.dkr.ecr.us-east-2.amazonaws.com/yudeng_jenkins:$BUILD_NUMBER
                    '''
                }
            }
        }
        
        stage('Invoke Sub Pipeline') {
            steps {
                build job: 'jenkins-sub-pipeline', parameters: [
                    string(name: 'VERSION', value: "${BUILD_NUMBER}")
                ]
            }
        }
    }
}
