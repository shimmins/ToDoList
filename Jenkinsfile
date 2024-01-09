pipeline {
    agent any
    
    environment {
        registry = "035574589515.dkr.ecr.us-east-2.amazonaws.com/yudeng_jenkins"
        toDoListImage = "${registry}:todolist-${BUILD_NUMBER}"
        dbServerImage = "${registry}:dbserver-${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/TirTir/ToDoList']])
            }
        }
        
        stage("Build ToDoList Image") {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage("Build DBServer Image") {
            steps {
                dir('/var/lib/jenkins/workspace/jenkins/db-server') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage("Push ToDoList Image to ECR") {
            steps {
                script {
                    sh '''
                        docker build -t ${toDoListImage} /var/lib/jenkins/workspace/jenkins/to-do-list
                        aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 035574589515.dkr.ecr.us-east-2.amazonaws.com
                        docker push ${toDoListImage}
                    '''
                }
            }
        }

        stage("Push DBServer Image to ECR") {
            steps {
                script {
                    sh '''
                        docker build -t ${dbServerImage} /var/lib/jenkins/workspace/jenkins/db-server
                        aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 035574589515.dkr.ecr.us-east-2.amazonaws.com
                        docker push ${dbServerImage}
                    '''
                }
            }
        }

        stage('Invoke Sub Pipeline') {
            steps {
                build job: 'jenkins-sub-pipeline', parameters: [
                    string(name: 'TO_DO_LIST_VERSION', value: "${BUILD_NUMBER}"),
                    string(name: 'DB_SERVER_VERSION', value: "${BUILD_NUMBER}")
                ]
            }
        }
    }
}
